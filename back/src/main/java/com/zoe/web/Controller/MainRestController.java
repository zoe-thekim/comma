package com.zoe.web.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
@Slf4j
@RestController
public class MainRestController {
    @GetMapping("/")
    public String main_main(Model model)
    {
        model.addAttribute("content", "home/home");
        return "main";
    }
}
