package com.zoe.web.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UsersDTO {
    private String userEmail;
    private String userPwd;
    private String role;

    private String name;
    private String phone;
    private String address;
}