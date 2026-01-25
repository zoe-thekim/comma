package com.zoe.web.Repository;

import com.zoe.web.Entity.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByMemberId(String memberId);

    boolean existsByMemberId(String memberId);

}