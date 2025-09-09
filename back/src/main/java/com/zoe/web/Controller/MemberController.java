package com.zoe.web.Controller;

import com.zoe.web.Entity.Member;
import com.zoe.web.Service.MemberService;
import jakarta.persistence.TableGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/login")
    public String login() {

        log.info("1");
        return "/member/login";
    }

    @GetMapping("/join")
    public String join() {
        return "/member/join";
    }

    @GetMapping("/member/Success")
    public String JoinSuccess(){
        return "/member/Success";
    }
}
