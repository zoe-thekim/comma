package com.zoe.web.Security.Provider;

import com.zoe.web.Entity.AuthProvider;
import com.zoe.web.Entity.Users;
import com.zoe.web.Entity.UsersAuthProvider;
import com.zoe.web.Repository.AuthRepository;
import com.zoe.web.Repository.UsersAuthProviderRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleOidcUserService implements OAuth2UserService<OidcUserRequest, OidcUser> {
    private final AuthRepository authRepository;
    private final UsersAuthProviderRepository usersAuthProviderRepository;
    private final HttpSession httpSession;

    @Override
    @Transactional
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);
        OidcUser delegate = new OidcUserService().loadUser(userRequest);

        String email = delegate.getEmail();
        String name = (String) delegate.getAttributes().get("name");
        String sub = delegate.getSubject();
//        AuthProvider provider = AuthProvider.GOOGLE;     // 구글 고유 ID

        log.info("1");
        if (email == null) {
            throw new OAuth2AuthenticationException("Google OIDC 응답에 email이 없습니다. scope 확인 필요.");
        }

        log.info("2");
        // 기존 OAuth 인증 정보 확인
        UsersAuthProvider authProvider = usersAuthProviderRepository
                .findByProviderAndProviderUserId(AuthProvider.GOOGLE, sub)
                .orElse(null);

        Users user;
        if (authProvider != null) {
            // 기존 OAuth 사용자 - 연결된 Users 정보 사용
            user = authProvider.getUsers();
        } else {
            // 새로운 OAuth 사용자 - Users 생성 후 AuthProvider 생성
            user = authRepository.findByUserEmail(email)
                    .orElseGet(() -> authRepository.save(Users.createSocialUsers(email)));

            // OAuth 인증 정보 저장
            authProvider = UsersAuthProvider.createAuthProvider(user, AuthProvider.GOOGLE, sub);
            usersAuthProviderRepository.save(authProvider);
        }

        // 최신 사용자 정보로 세션 설정 (이메일 기준 통일)
        Users currentUser = authRepository.findByUserEmail(email)
                .orElseThrow(() -> new OAuth2AuthenticationException("사용자 정보를 찾을 수 없습니다."));

        httpSession.setAttribute("LOGIN_USER_EMAIL", currentUser.getUserEmail());
        httpSession.setAttribute("LOGIN_USER_NO", currentUser.getUserNo());
        httpSession.setAttribute("LOGIN_USER_PWD", currentUser.getUserPwd());

        log.info("Google OAuth 로그인 완료 - 이메일: " + currentUser.getUserEmail() +
                ", 사용자 번호: " + currentUser.getUserNo());

        // 권한 부여 (예시)
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));

        // 반환은 'OAuth2User' 여야 함 → 대표 key는 구글 기본 'sub'
        // attributes는 그대로 oAuth2User의 것을 쓰면 /api/me 등에서 표준 키로 접근 가능
        return new DefaultOidcUser(authorities, delegate.getIdToken(), "sub");
    }
}