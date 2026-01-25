package com.zoe.web.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "member_auth")
@NoArgsConstructor
public class MemberAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    // Member와 FK 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // 인증 제공자 (google, kakao, naver 등)
    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false, length = 20)
    private AuthProvider provider;

    // 인증 사용자 아이디 (OAuth provider에서 제공하는 고유 ID)
    @Column(name = "provider_user_id", nullable = false, length = 100)
    private String providerUserId;

    // 생성 시간
    @CreationTimestamp
    @Column(name = "create_dt", nullable = false, updatable = false)
    private LocalDateTime createDt;
}
