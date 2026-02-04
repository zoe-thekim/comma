package com.zoe.web.Controller.Users;

import com.zoe.web.DTO.UsersDTO;
import com.zoe.web.Entity.Users;
import com.zoe.web.Service.UsersService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UsersRestController {

    private final UsersService usersService;

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody UsersDTO request, HttpServletRequest httpServletRequest) {
        log.info("사용자 정보 업데이트 요청 받음");
        log.info("요청 데이터: {}", request.toString());

        HttpSession session = httpServletRequest.getSession(false);
        if (session == null || session.getAttribute("LOGIN_USER_EMAIL") == null) {
            log.warn("인증되지 않은 사용자의 업데이트 요청");
            return ResponseEntity.status(401).body(Map.of("status", "UNAUTHORIZED", "message", "로그인이 필요합니다."));
        }

        String userEmail = (String) session.getAttribute("LOGIN_USER_EMAIL");
        log.info("인증된 사용자 이메일: {}", userEmail);

        try {
            // 업데이트 전 현재 정보 확인
            Users currentUser = usersService.findByUserEmail(userEmail);
            log.info("현재 사용자 정보 - 이름: {}, 전화번호: {}, 주소: {}, 상세주소: {}",
                    currentUser.getName(), currentUser.getPhone(), currentUser.getAddress(), currentUser.getDetailAddress());

            // 사용자 정보 업데이트
            Users updatedUser = usersService.updateUserInfo(userEmail, request);

            // 업데이트 후 검증
            Users verificationUser = usersService.findByUserEmail(userEmail);
            log.info("업데이트 후 사용자 정보 - 이름: {}, 전화번호: {}, 주소: {}, 상세주소: {}, 수정시간: {}",
                    verificationUser.getName(), verificationUser.getPhone(), verificationUser.getAddress(),
                    verificationUser.getDetailAddress(), verificationUser.getUpdateDt());

            // 응답용 DTO 생성
            UsersDTO responseData = new UsersDTO();
            responseData.setUserEmail(verificationUser.getUserEmail());
            responseData.setName(verificationUser.getName());
            responseData.setPhone(verificationUser.getPhone());
            responseData.setAddress(verificationUser.getAddress());
            responseData.setDetailAddress(verificationUser.getDetailAddress());

            log.info("사용자 정보 업데이트 API 응답 성공 - 이메일: {}", userEmail);

            return ResponseEntity.ok(Map.of(
                    "status", "OK",
                    "message", "정보가 성공적으로 업데이트되었습니다.",
                    "data", responseData,
                    "updateTime", verificationUser.getUpdateDt() != null ? verificationUser.getUpdateDt().toString() : null
            ));

        } catch (IllegalArgumentException e) {
            log.error("사용자 정보 업데이트 실패 - 이메일: {}, 오류: {}", userEmail, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("status", "FAIL", "message", e.getMessage()));
        } catch (Exception e) {
            log.error("사용자 정보 업데이트 중 예상치 못한 오류 - 이메일: {}, 오류: {}", userEmail, e.getMessage());
            return ResponseEntity.status(500).body(Map.of("status", "ERROR", "message", "서버 내부 오류가 발생했습니다."));
        }
    }
}
