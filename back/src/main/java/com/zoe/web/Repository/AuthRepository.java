package com.zoe.web.Repository;

import com.zoe.web.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findByUserEmail(String userEmail);

    boolean existsByUserEmail(String userEmail);

    // 사용자 정보 업데이트를 위한 커스텀 쿼리
    @Modifying
    @Query("UPDATE Users u SET u.name = :name, u.phone = :phone, u.address = :address WHERE u.userEmail = :userEmail")
    int updateUserInfo(@Param("userEmail") String userEmail,
                       @Param("name") String name,
                       @Param("phone") String phone,
                       @Param("address") String address);

    // 비밀번호 업데이트를 위한 커스텀 쿼리
    @Modifying
    @Query("UPDATE Users u SET u.userPwd = :newPassword WHERE u.userEmail = :userEmail")
    int updatePassword(@Param("userEmail") String userEmail, @Param("newPassword") String newPassword);

    // 특정 필드만 업데이트하는 메서드들
    @Modifying
    @Query("UPDATE Users u SET u.name = :name WHERE u.userEmail = :userEmail")
    int updateName(@Param("userEmail") String userEmail, @Param("name") String name);

    @Modifying
    @Query("UPDATE Users u SET u.phone = :phone WHERE u.userEmail = :userEmail")
    int updatePhone(@Param("userEmail") String userEmail, @Param("phone") String phone);

    @Modifying
    @Query("UPDATE Users u SET u.address = :address WHERE u.userEmail = :userEmail")
    int updateAddress(@Param("userEmail") String userEmail, @Param("address") String address);

}