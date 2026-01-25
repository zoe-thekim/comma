package com.zoe.web.Security.Provider;

import com.zoe.web.Entity.AuthProvider;
import com.zoe.web.Entity.Users;
import com.zoe.web.Entity.UsersAuthProvider;
import com.zoe.web.Repository.AuthRepository;
import com.zoe.web.Repository.UsersAuthProviderRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final AuthRepository authRepository;
    private final UsersAuthProviderRepository usersAuthProviderRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String providerId = oAuth2User.getAttribute("sub");
        AuthProvider provider = AuthProvider.GOOGLE;     // 구글 고유 ID

        log.info("1");
        // 기존 OAuth 인증 정보 확인
        UsersAuthProvider authProvider = usersAuthProviderRepository
                .findByProviderAndProviderUserId(AuthProvider.GOOGLE, providerId)
                .orElse(null);

        Users users;
        if (authProvider != null) {
            // 기존 OAuth 사용자 - 연결된 Users 정보 사용
            users = authProvider.getUsers();
        } else {
            // 새로운 OAuth 사용자 - Users 생성 후 AuthProvider 생성
            users = authRepository.findByUserEmail(email)
                    .orElseGet(() -> authRepository.save(Users.createSocialUsers(email)));

            // OAuth 인증 정보 저장
            authProvider = UsersAuthProvider.createAuthProvider(users, AuthProvider.GOOGLE, providerId);
            usersAuthProviderRepository.save(authProvider);
        }

        // 이메일 기준으로 최신 사용자 정보 조회 후 세션 설정
        Users currentUser = authRepository.findByUserEmail(email)
                .orElseThrow(() -> new OAuth2AuthenticationException("사용자 정보를 찾을 수 없습니다."));

        httpSession.setAttribute("LOGIN_USER_EMAIL", currentUser.getUserEmail());
        httpSession.setAttribute("LOGIN_USER_NO", currentUser.getUserNo());
        httpSession.setAttribute("LOGIN_USER_PWD", currentUser.getUserPwd());

        log.info("Google OAuth2 로그인 완료 - 이메일: " + currentUser.getUserEmail() +
                ", 사용자 번호: " + currentUser.getUserNo());

        // 권한 부여 (예시)
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));

        // 반환은 'OAuth2User' 여야 함 → 대표 key는 구글 기본 'sub'
        // attributes는 그대로 oAuth2User의 것을 쓰면 /api/me 등에서 표준 키로 접근 가능
        return new DefaultOAuth2User(authorities, oAuth2User.getAttributes(), "sub");
    }
}