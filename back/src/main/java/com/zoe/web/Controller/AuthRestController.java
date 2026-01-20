package com.zoe.web.Controller;

import com.zoe.web.Config.SecurityConfig;
import com.zoe.web.DTO.MemberDTO;
import com.zoe.web.Entity.Member;
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
    public ResponseEntity<?> join(@RequestBody MemberDTO request, HttpServletRequest httpRequest) {
        Member m = new Member();
        m.setMemberId(request.getMemberId());
        m.setMemberPwd(sc.passwordEncoder().encode(request.getMemberPwd()));
        m.setRole("USER");
        m.setStatus("ACTIVE");
        log.info(request.getMemberId());

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
    public ResponseEntity<?> login(@RequestBody Member member, HttpServletRequest request)
    {
        Member me =  authService.LoginCheck(member);
        if(me != null){
            log.info(me.getMemberId());
            log.info( me.getMemberPwd());

            HttpSession session = request.getSession();
            session.setAttribute("LOGIN_MEMBER_NO", me.getMemberNo());
            session.setAttribute("LOGIN_MEMBER_ID", me.getMemberId());
            session.setAttribute("LOGIN_MEMBER_PWD", me.getMemberPwd());
            return ResponseEntity.ok(Map.of("status", "OK", "data", me));
        }
        return ResponseEntity.badRequest().body(Map.of("status", "NG"));
    }

    // 세션 확인하는 함수
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request){
        HttpSession session = request.getSession(false); // 기존 세션 가져오기. 없으면 null
        if (session == null || session.getAttribute("LOGIN_MEMBER_ID") == null) {
            return ResponseEntity.status(401).body(Map.of("status", "ANON"));
        }

        String memberId = (String) session.getAttribute("LOGIN_MEMBER_ID");
        int memberNo = (int) session.getAttribute("LOGIN_MEMBER_NO");

        log.info("GetMemberSession");

        return ResponseEntity.ok(Map.of(
                "status", "OK",
                "memberId", memberId,
                "memberNo", memberNo
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        log.info("로그아웃 요청");
        var s = request.getSession(false);
        log.info("세션 false 설정");
        if(s != null) s.invalidate();
        return ResponseEntity.noContent().build();
    }
}
