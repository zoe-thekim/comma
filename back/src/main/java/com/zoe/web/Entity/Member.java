package com.zoe.web.Entity;

import com.nimbusds.oauth2.sdk.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "member")
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_no")
    private int memberNo;


    @Column(name = "member_id", nullable = false, length = 30)
    private String memberId;

    @Column(name = "member_pwd", nullable = false)
    private String memberPwd;

    // google이 들어감
    @Column(name = "provider", nullable = true)
    private AuthProvider provider;

    // 구글 로그인 한 유저의 고유 ID
    @Column(name = "provider_id", nullable = true)
    private String providerId;

    // 회원 역할
    @Column(name = "role", nullable = false)
    private String role;

    // 회원 상태
    @Column(name = "status", nullable = false)
    private String status;

    // 생성 시간
    @CreationTimestamp
    @Column(name = "create_dt", nullable = false, updatable = false)
    private LocalDateTime createDt;

    // 수정 시간
    @UpdateTimestamp
    @Column(name = "update_dt", nullable = true)
    private LocalDateTime updateDt;

    public static Member createSocialMember(String email, AuthProvider provider, String providerId){
        Member member = new Member();
        member.memberId = email;
        member.memberPwd = "passwordOAuth2";
        member.role = "USER";
        member.status = "ACTIVE";
        member.provider = AuthProvider.GOOGLE;
        member.providerId = providerId;
        return member;
    }
}

