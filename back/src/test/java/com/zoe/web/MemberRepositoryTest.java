package com.zoe.web;

import com.zoe.web.Entity.Users;
import com.zoe.web.Repository.AuthRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
public class MemberRepositoryTest {

    @Autowired
    AuthRepository authRepository;

    @Test
    @Transactional
    @Rollback(false)	// H2 DB 상에서 직접 확인하기 위해, 테스트 이후에도 DB를 롤백하지 않겠다.
    public void testMember() throws Exception {
        //given
        Users member = new Users();
//        member.setMEMBER_NO(1);

        //when
//        int savedId = memberRepository.save(member);
//        Member findUser = memberRepository.find(savedId);
//
//        //then
//        Assertions.assertThat(findUser.getMEMBER_NO()).isEqualTo(member.getMEMBER_NO());
//        Assertions.assertThat(findUser.getMEMBER_ID()).isEqualTo(member.getMEMBER_ID());

    }
}