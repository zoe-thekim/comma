// src/main/java/com.demogroup.demoweb/Controller/HelloWorldController.java

package com.zoe.web.Controller;

import lombok.Data;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class HelloWorldController {

    @GetMapping("/api/hello")
    public String test() {
        Date date = new Date();
        return "현재 서버의 시간은 "+ date + " 입니다 !";
    }
}