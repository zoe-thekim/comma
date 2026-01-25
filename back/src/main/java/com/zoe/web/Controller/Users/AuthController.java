package com.zoe.web.Controller.Users;

import com.zoe.web.Service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @GetMapping("/login")
    public String login() {
        log.info("Controller: 로그인");
        return "/auth/login";
    }

    @GetMapping("/join")
    public String join() {
        return "/auth/join";
    }

    @GetMapping("/auth/Success")
    public String JoinSuccess(){
        return "/auth/Success";
    }

    @GetMapping("/member/information/Information")
    public String UserInformation(){
        return "/member/information/Information";
    }
}
