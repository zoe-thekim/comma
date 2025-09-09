package com.zoe.web.Security.Provider;

import com.zoe.web.Entity.AuthProvider;
import com.zoe.web.Entity.Member;
import com.zoe.web.Repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleOidcUserService implements OAuth2UserService<OidcUserRequest, OidcUser> {
    private final MemberRepository memberRepository;
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
        // upsert
        Member member = memberRepository.findByMemberId(email)
                .orElseGet(() -> memberRepository.save(
                        Member.createSocialMember(email, AuthProvider.GOOGLE, sub) // 이름/사진 저장 로직 추가 권장
                ));

        httpSession.setAttribute("LOGIN_MEMBER_NO", member.getMemberNo() );
        httpSession.setAttribute("LOGIN_MEMBER_ID", member.getMemberId() );
        log.info(member.getMemberId());

        // 권한 부여 (예시)
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));

        // 반환은 'OAuth2User' 여야 함 → 대표 key는 구글 기본 'sub'
        // attributes는 그대로 oAuth2User의 것을 쓰면 /api/me 등에서 표준 키로 접근 가능
        return new DefaultOidcUser(authorities, delegate.getIdToken(), "sub");
    }
}