package com.zoe.web.Config;

import com.zoe.web.Security.OAuth2UserProviderRouter;
import com.zoe.web.Security.OidcUserProviderRouter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Slf4j
@EnableWebSecurity
@Configuration
public class SecurityConfig implements WebMvcConfigurer{
    private final OidcUserProviderRouter oidcUserProviderRouter;

    public SecurityConfig(OidcUserProviderRouter oidcUserProviderRouter) {
        this.oidcUserProviderRouter = oidcUserProviderRouter;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .exposedHeaders("Set-Cookie")
                .allowCredentials(true);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers(
                        "/member/**",   // 프론트가 치고 들어오는 커스텀 경로
                        "/oauth2/**",   // 소셜 로그인 관련 요청 허용
                        "/login/**"     // OAuth2 redirect 관련 요청 허용
                ).permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth -> oauth
                .userInfoEndpoint(userInfo -> userInfo.oidcUserService(oidcUserProviderRouter))
                .successHandler((req, res, auth) -> res.sendRedirect("http://localhost:3000"))
            )
            .logout(logout -> logout
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("http://localhost:3000")
            );
        return http.build();
    }
}

