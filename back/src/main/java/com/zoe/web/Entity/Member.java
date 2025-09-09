package com.zoe.web.Entity;

import com.nimbusds.oauth2.sdk.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "member")
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    public static Member createSocialMember(String email, AuthProvider provider, String providerId){
        Member member = new Member();
        member.memberId = email;
        member.memberPwd = "passwordOAuth2";
        member.provider = AuthProvider.GOOGLE;
        member.providerId = providerId;
        return member;
    }
}
