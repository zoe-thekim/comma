package com.zoe.web.Repository;

import com.zoe.web.Entity.AuthProvider;
import com.zoe.web.Entity.UsersAuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersAuthProviderRepository extends JpaRepository<UsersAuthProvider, Integer> {

    Optional<UsersAuthProvider> findByProviderAndProviderUserId(AuthProvider provider, String providerUserId);

}