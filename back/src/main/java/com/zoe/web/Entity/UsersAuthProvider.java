package com.zoe.web.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(
        name = "users_auth_provider",
        indexes = {
                @Index(name = "idx_uap_user_no", columnList = "user_no"),
                @Index(name = "idx_uap_provider", columnList = "provider")
        }
        // 필요하면 unique도 추가 권장(아래 참고)
)
@Getter
@Setter
@NoArgsConstructor
public class UsersAuthProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_auth_provider_no")
    private Long userAuthProviderNo;

    // Users와 FK 관계
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_no", referencedColumnName = "user_no", foreignKey = @ForeignKey(name="fk_uap_user")
    )
    private Users users;

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

    // 수정 시간
    @CreationTimestamp
    @Column(name = "update_dt", nullable = false, updatable = true)
    private LocalDateTime updateDt;

    public static UsersAuthProvider createAuthProvider(Users users, AuthProvider provider, String providerId){
        UsersAuthProvider authProvider = new UsersAuthProvider();
        authProvider.users = users;
        authProvider.provider = provider;
        authProvider.providerUserId = providerId;
        return authProvider;
    }
}
