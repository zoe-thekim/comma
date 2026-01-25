package com.zoe.web.Service;

import com.zoe.web.Config.SecurityConfig;
import com.zoe.web.Entity.Users;
import com.zoe.web.Repository.AuthRepository;
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
    private final AuthRepository authRepository;
    private final SecurityConfig cfg;
    // 회원가입
    @Transactional
    public int SaveMember(Users users){
        try {
            log.info(users.getUserEmail());

            if(authRepository.existsByUserEmail(users.getUserEmail())){
                return 2;   // 중복
            }
            log.info("AuthService");

            log.info("EMAIL : " + users.getUserEmail());
            log.info("PWD : " + users.getUserPwd());

            authRepository.save(users);

           return 1;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return -1;
    }

    public Users LoginCheck(Users users){
        // 입력값 검증
        if (users.getUserEmail() == null || users.getUserEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("이메일이 필요합니다.");
        }
        if (users.getUserPwd() == null || users.getUserPwd().trim().isEmpty()) {
            throw new IllegalArgumentException("비밀번호가 필요합니다.");
        }

        Users m = authRepository.findByUserEmail(users.getUserEmail())
            .orElseThrow(() -> new IllegalArgumentException("이메일이 올바르지 않습니다."));
        // 여기서 throw 하면 react단에서는 그냥 500에러 발생

        // OAuth 사용자인 경우 비밀번호 체크 생략
//        if(m.getProvider() != null && m.getProvider().equals("google")){
//            throw new IllegalArgumentException("구글 계정으로 등록된 사용자입니다. 구글 로그인을 이용해주세요.");
//        }

        if(!cfg.passwordEncoder().matches(users.getUserPwd(), m.getUserPwd())){
            throw new IllegalArgumentException("비밀번호가 올바르지 않습니다.");
        }
        return m;
    }

    // 사용자 정보 업데이트 (DTO 사용) - 개선된 버전
    @Transactional
    public Users updateUserInfo(String userEmail, com.zoe.web.DTO.UsersDTO updateRequest) {
        // 사용자 존재 확인
        Users existingUser = authRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        log.info("사용자 정보 업데이트 시작 - 이메일: {}", userEmail);

        // 변경사항 추적을 위한 플래그
        boolean hasChanges = false;

        // 필드별 업데이트 처리 (null 및 빈 값 처리 강화)
        String newName = updateRequest.getName() != null ? updateRequest.getName().trim() : null;
        String newPhone = updateRequest.getPhone() != null ? updateRequest.getPhone().trim() : null;
        String newAddress = updateRequest.getAddress() != null ? updateRequest.getAddress().trim() : null;

        // 변경사항이 있는지 확인
        if (newName != null && !newName.equals(existingUser.getName())) {
            existingUser.setName(newName.isEmpty() ? null : newName);
            hasChanges = true;
            log.info("이름 변경: {} -> {}", existingUser.getName(), newName);
        }

        if (newPhone != null && !newPhone.equals(existingUser.getPhone())) {
            existingUser.setPhone(newPhone.isEmpty() ? null : newPhone);
            hasChanges = true;
            log.info("전화번호 변경: {} -> {}", existingUser.getPhone(), newPhone);
        }

        if (newAddress != null && !newAddress.equals(existingUser.getAddress())) {
            existingUser.setAddress(newAddress.isEmpty() ? null : newAddress);
            hasChanges = true;
            log.info("주소 변경: {} -> {}", existingUser.getAddress(), newAddress);
        }

        if (hasChanges) {
            // 데이터베이스에 저장 (update_dt는 @UpdateTimestamp로 자동 업데이트)
            Users savedUser = authRepository.save(existingUser);
            log.info("사용자 정보 업데이트 완료 - 이메일: {}", userEmail);
            return savedUser;
        } else {
            log.info("변경사항이 없어 업데이트를 건너뜁니다 - 이메일: {}", userEmail);
            return existingUser;
        }
    }

    // 비밀번호 변경 - 강화된 버전
    @Transactional
    public void updatePassword(String userEmail, String currentPassword, String newPassword) {
        // 입력값 검증
        if (currentPassword == null || currentPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("현재 비밀번호가 필요합니다.");
        }
        if (newPassword == null || newPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("새 비밀번호가 필요합니다.");
        }
        if (newPassword.length() < 6) {
            throw new IllegalArgumentException("새 비밀번호는 6자 이상이어야 합니다.");
        }

        Users user = authRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        log.info("비밀번호 변경 요청 - 이메일: {}", userEmail);

        // 현재 비밀번호 확인
        if (!cfg.passwordEncoder().matches(currentPassword, user.getUserPwd())) {
            log.warn("비밀번호 변경 실패 - 현재 비밀번호 불일치: {}", userEmail);
            throw new IllegalArgumentException("현재 비밀번호가 올바르지 않습니다.");
        }

        // 새 비밀번호가 현재 비밀번호와 같은지 확인
        if (cfg.passwordEncoder().matches(newPassword, user.getUserPwd())) {
            throw new IllegalArgumentException("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
        }

        // 새 비밀번호 암호화
        String encodedNewPassword = cfg.passwordEncoder().encode(newPassword);

        // 데이터베이스 업데이트
        user.setUserPwd(encodedNewPassword);
        authRepository.save(user);

        log.info("비밀번호 변경 완료 - 이메일: {}", userEmail);
    }

    // 사용자 이메일로 조회
    public Users findByUserEmail(String userEmail) {
        return authRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }
}
