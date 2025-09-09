package com.zoe.web.Security;

import com.zoe.web.Security.Provider.GoogleOAuth2UserService;
import com.zoe.web.Security.Provider.GoogleOidcUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


// 핵심 라우터 역할
// google, naver 등 각 service에 위임
@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class OidcUserProviderRouter implements OAuth2UserService<OidcUserRequest, OidcUser> {
    private final GoogleOAuth2UserService googleOAuth2UserService;
    private final GoogleOidcUserService googleOidcUserService;
    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();    // google

        log.info("OidcUserProviderRouter");
        return switch (registrationId) {

            case "google" -> googleOidcUserService.loadUser(userRequest);
            default ->  throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인 입니다: " + registrationId);
        };
    }
}
