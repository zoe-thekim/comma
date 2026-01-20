package com.zoe.web.Service;

import com.zoe.web.Config.SecurityConfig;
import com.zoe.web.Entity.Member;
import com.zoe.web.Repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/*
* Repository: DB 접근만. 엔티티 CRUD/조회 쿼리.
→ findByMemberId(...) 같은 아이디 단일 조회만 하고, 비번 비교는 절대 넣지 않음.

Service: 비즈니스 로직의 집합.
→ 가입 시 BCrypt 해시 저장, 로그인 시 passwordEncoder.matches() 검증, 중복 체크, 트랜잭션 처리, 도메인 규칙 등.

Controller(@RestController): 얇게 유지.
→ DTO 수신/검증(@Valid), 서비스 호출, HTTP 상태코드/응답 포맷만 담당. 암호화/검증 로직 넣지 않음.

이렇게 분리해야 단위 테스트/유지보수/보안이 쉬워집니다.
*/
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final SecurityConfig cfg;
    // 회원가입
    @Transactional
    public int SaveMember(Member member){
        try {
            log.info(member.getMemberId());

            if(memberRepository.existsByMemberId(member.getMemberId())){
                return 2;   // 중복
            }
            log.info("AuthService");

            log.info("ID : " + member.getMemberId());
            log.info("PWD : " + member.getMemberPwd());

            memberRepository.save(member);

           return 1;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return -1;
    }

    public Member LoginCheck(Member member){
        Member m = memberRepository.findByMemberId(member.getMemberId())
            .orElseThrow(() -> new IllegalArgumentException("아이디가 올바르지 않습니다."));
        // 여기서 throw 하면 react단에서는 그냥 500에러 발생

        // OAuth 사용자인 경우 비밀번호 체크 생략
//        if(m.getProvider() != null && m.getProvider().equals("google")){
//            throw new IllegalArgumentException("구글 계정으로 등록된 사용자입니다. 구글 로그인을 이용해주세요.");
//        }

        if(!cfg.passwordEncoder().matches(member.getMemberPwd(), m.getMemberPwd())){
            throw new IllegalArgumentException("비밀번호가 올바르지 않습니다.");
        }
        return m;
    }
}
