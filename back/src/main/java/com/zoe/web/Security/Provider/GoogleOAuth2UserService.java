package com.zoe.web.Security.Provider;

import com.zoe.web.Entity.AuthProvider;
import com.zoe.web.Entity.Member;
import com.zoe.web.Repository.MemberRepository;
import groovy.util.logging.Log;
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

import java.io.Console;
import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String providerId = oAuth2User.getAttribute("sub");
        AuthProvider provider = AuthProvider.GOOGLE;     // 구글 고유 ID

        log.info("1");
        // upsert
        Member member = memberRepository.findByMemberId(email)
                .orElseGet(() -> memberRepository.save(
                        Member.createSocialMember(email, AuthProvider.GOOGLE, providerId) // 이름/사진 저장 로직 추가 권장
                ));

        // 권한 부여 (예시)
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));

        // 반환은 'OAuth2User' 여야 함 → 대표 key는 구글 기본 'sub'
        // attributes는 그대로 oAuth2User의 것을 쓰면 /api/me 등에서 표준 키로 접근 가능
        return new DefaultOAuth2User(authorities, oAuth2User.getAttributes(), "sub");
    }
}