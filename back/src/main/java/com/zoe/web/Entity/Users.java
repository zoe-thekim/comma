package com.zoe.web.Entity;

import com.zoe.web.DTO.UsersRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private int userNo;

    @Column(name = "user_email", nullable = false, length = 60)
    private String userEmail;

    @Column(name = "user_pwd", nullable = false)
    private String userPwd;

//    // google이 들어감
//    @Column(name = "provider", nullable = true)
//    private AuthProvider provider;
//
//    // 구글 로그인 한 유저의 고유 ID
//    @Column(name = "provider_id", nullable = true)
//    private String providerId;

    // 회원 역할
    @Column(name = "role", nullable = false)
    private UsersRole role;

    // 회원 상태
    @Column(name = "state", nullable = false)
    private UsersState state;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "phone", length = 30)
    private String phone;

    @Column(name = "address", length = 500)
    private String address;

    // 생성 시간
    @CreationTimestamp
    @Column(name = "create_dt", nullable = false, updatable = false)
    private LocalDateTime createDt;

    // 수정 시간
    @UpdateTimestamp
    @Column(name = "update_dt", nullable = true)
    private LocalDateTime updateDt;

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UsersAuthProvider> authProviders = new ArrayList<>();

    public static Users createSocialUsers(String email){
        Users users = new Users();
        users.userEmail = email;
        users.userPwd = "passwordOAuth2";
        users.role = UsersRole.USER;
        users.state = UsersState.ACTIVE;
        return users;
    }
}

