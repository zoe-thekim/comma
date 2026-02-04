package com.zoe.web.Controller.Users;

import com.zoe.web.Config.SecurityConfig;
import com.zoe.web.DTO.UsersDTO;
import com.zoe.web.DTO.UsersRole;
import com.zoe.web.Entity.Users;
import com.zoe.web.Entity.UsersState;
import com.zoe.web.Service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


// API 만 담

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthRestController {

    private final SecurityConfig sc;
    private final AuthService authService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UsersDTO request, HttpServletRequest httpRequest) {
        // 입력값 검증
        if (request.getUserEmail() == null || request.getUserEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", "이메일이 필요합니다."));
        }
        if (request.getUserPwd() == null || request.getUserPwd().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", "비밀번호가 필요합니다."));
        }

        Users m = new Users();
        m.setUserEmail(request.getUserEmail());
        m.setUserPwd(sc.passwordEncoder().encode(request.getUserPwd()));
        m.setRole(UsersRole.USER);
        m.setState(UsersState.ACTIVE);
        log.info(request.getUserEmail());

        int res = authService.SaveMember(m);
        log.info(String.valueOf(res));
        if (res == 1) {
            return ResponseEntity.ok(Map.of("status", "OK", "message", "회원가입 성공"));
        } else if(res == 2){
            return ResponseEntity.badRequest().body(Map.of("status", "ID DUPLICATE", "message", "중복된 이메일입니다."));
        }
        else {
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", "회원가입 실패"));
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users member, HttpServletRequest request)
    {
        // 입력값 검증
        if (member.getUserEmail() == null || member.getUserEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", "이메일이 필요합니다."));
        }
        if (member.getUserPwd() == null || member.getUserPwd().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", "비밀번호가 필요합니다."));
        }

        try {
            Users me = authService.LoginCheck(member);
            if(me != null){
                log.info(me.getUserEmail());
                log.info( me.getUserPwd());

                HttpSession session = request.getSession();

                // 이메일 기준 통일된 세션 설정
                session.setAttribute("LOGIN_USER_EMAIL", me.getUserEmail());
                session.setAttribute("LOGIN_USER_NO", me.getUserNo());
                session.setAttribute("LOGIN_USER_PWD", me.getUserPwd());

                log.info("로컬 로그인 완료 - 이메일: " + me.getUserEmail() +
                        ", 사용자 번호: " + me.getUserNo());

                return ResponseEntity.ok(Map.of("status", "OK", "data", me));
            }
            return ResponseEntity.badRequest().body(Map.of("status", "NG"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", e.getMessage()));
        }
    }

    // 세션 확인하는 함수
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request){
        HttpSession session = request.getSession(false); // 기존 세션 가져오기. 없으면 null
        if (session == null || session.getAttribute("LOGIN_USER_EMAIL") == null) {
            return ResponseEntity.status(401).body(Map.of("status", "ANON"));
        }

        String userEmail = (String) session.getAttribute("LOGIN_USER_EMAIL");
        Integer userNo = (Integer) session.getAttribute("LOGIN_USER_NO");

        // DB에서 최신 사용자 정보 조회
        try {
            Users currentUser = authService.findByUserEmail(userEmail);

            // 응답용 DTO 생성
            UsersDTO userData = new UsersDTO();
            userData.setUserEmail(currentUser.getUserEmail());
            userData.setName(currentUser.getName());
            userData.setPhone(currentUser.getPhone());
            userData.setAddress(currentUser.getAddress());
            userData.setDetailAddress(currentUser.getDetailAddress());

            log.info("GetUserSession - Email: " + userEmail + ", UserNo: " + userNo);

            return ResponseEntity.ok(Map.of(
                    "status", "OK",
                    "userEmail", userEmail,
                    "userNo", userNo != null ? userNo : 0,
                    "userData", userData
            ));
        } catch (Exception e) {
            log.error("사용자 정보 조회 실패: " + e.getMessage());
            return ResponseEntity.ok(Map.of(
                    "status", "OK",
                    "userEmail", userEmail,
                    "userNo", userNo != null ? userNo : 0
            ));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        log.info("로그아웃 요청");
        var s = request.getSession(false);
        log.info("세션 false 설정");
        if(s != null) s.invalidate();
        return ResponseEntity.noContent().build();
    }

    // 사용자 정보 수정
    @PutMapping("/update-info")
    public ResponseEntity<?> updateUserInfo(@RequestBody UsersDTO updateRequest, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("LOGIN_USER_EMAIL") == null) {
            return ResponseEntity.status(401).body(Map.of("status", "UNAUTHORIZED", "message", "로그인이 필요합니다."));
        }

        String userEmail = (String) session.getAttribute("LOGIN_USER_EMAIL");
        log.info("사용자 정보 업데이트 요청 - 이메일: {}", userEmail);

        try {
            // 업데이트 전 현재 정보 로깅
            Users currentUser = authService.findByUserEmail(userEmail);
            log.info("현재 사용자 정보 - 이름: {}, 전화번호: {}, 주소: {}",
                    currentUser.getName(), currentUser.getPhone(), currentUser.getAddress());

            // 데이터베이스 업데이트 실행
            Users updatedUser = authService.updateUserInfo(userEmail, updateRequest);

            // 업데이트 후 정보 확인
            Users verificationUser = authService.findByUserEmail(userEmail);
            log.info("업데이트 후 사용자 정보 - 이름: {}, 전화번호: {}, 주소: {}, 수정시간: {}",
                    verificationUser.getName(), verificationUser.getPhone(), verificationUser.getAddress(),
                    verificationUser.getUpdateDt());

            // 응답용 DTO 생성 (비밀번호 제외)
            UsersDTO responseData = new UsersDTO();
            responseData.setUserEmail(verificationUser.getUserEmail());
            responseData.setName(verificationUser.getName());
            responseData.setPhone(verificationUser.getPhone());
            responseData.setAddress(verificationUser.getAddress());

            log.info("사용자 정보 업데이트 API 응답 성공 - 이메일: {}", userEmail);

            return ResponseEntity.ok(Map.of(
                "status", "OK",
                "message", "정보가 성공적으로 업데이트되었습니다.",
                "data", responseData,
                "updateTime", verificationUser.getUpdateDt().toString()
            ));

        } catch (IllegalArgumentException e) {
            log.error("사용자 정보 업데이트 실패 - 이메일: {}, 오류: {}", userEmail, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", e.getMessage()));
        } catch (Exception e) {
            log.error("사용자 정보 업데이트 중 예상치 못한 오류 - 이메일: {}, 오류: {}", userEmail, e.getMessage());
            return ResponseEntity.status(500).body(Map.of("status", "ERROR", "message", "서버 내부 오류가 발생했습니다."));
        }
    }

    // 비밀번호 변경 - 강화된 버전
    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> passwordRequest, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("LOGIN_USER_EMAIL") == null) {
            return ResponseEntity.status(401).body(Map.of("status", "UNAUTHORIZED", "message", "로그인이 필요합니다."));
        }

        String userEmail = (String) session.getAttribute("LOGIN_USER_EMAIL");
        String currentPassword = passwordRequest.get("currentPassword");
        String newPassword = passwordRequest.get("newPassword");

        log.info("비밀번호 변경 요청 - 이메일: {}", userEmail);

        // 기본 입력값 검증 (Service에서도 다시 검증하지만 빠른 응답을 위해)
        if (currentPassword == null || currentPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", "현재 비밀번호가 필요합니다."));
        }
        if (newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", "새 비밀번호가 필요합니다."));
        }

        try {
            // 비밀번호 변경 전 사용자 정보 확인
            Users userBeforeUpdate = authService.findByUserEmail(userEmail);
            log.info("비밀번호 변경 전 사용자 확인 - 이메일: {}, 수정시간: {}",
                    userEmail, userBeforeUpdate.getUpdateDt());

            // 데이터베이스에 비밀번호 변경 실행
            authService.updatePassword(userEmail, currentPassword, newPassword);

            // 비밀번호 변경 후 검증
            Users userAfterUpdate = authService.findByUserEmail(userEmail);
            log.info("비밀번호 변경 완료 - 이메일: {}, 새로운 수정시간: {}",
                    userEmail, userAfterUpdate.getUpdateDt());

            // 세션 무효화 (보안상 재로그인 요구)
            session.invalidate();
            log.info("비밀번호 변경으로 인한 세션 무효화 - 이메일: {}", userEmail);

            return ResponseEntity.ok(Map.of(
                "status", "OK",
                "message", "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.",
                "updateTime", userAfterUpdate.getUpdateDt().toString(),
                "requireRelogin", true
            ));

        } catch (IllegalArgumentException e) {
            log.error("비밀번호 변경 실패 - 이메일: {}, 오류: {}", userEmail, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", e.getMessage()));
        } catch (Exception e) {
            log.error("비밀번호 변경 중 예상치 못한 오류 - 이메일: {}, 오류: {}", userEmail, e.getMessage());
            return ResponseEntity.status(500).body(Map.of("status", "ERROR", "message", "서버 내부 오류가 발생했습니다."));
        }
    }
}
