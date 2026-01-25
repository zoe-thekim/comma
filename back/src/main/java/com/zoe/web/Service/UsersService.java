package com.zoe.web.Service;

import com.zoe.web.DTO.UsersDTO;
import com.zoe.web.Entity.Users;
import com.zoe.web.Repository.AuthRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsersService {

    private final AuthRepository authRepository;

    public Users findByUserEmail(String userEmail) {
        return authRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    @Transactional
    public Users updateUserInfo(String userEmail, UsersDTO updateRequest) {
        Users existingUser = authRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        log.info("사용자 정보 업데이트 시작 - 이메일: {}", userEmail);
        log.info("요청 데이터 - 이름: {}, 전화번호: {}, 주소: {}",
                updateRequest.getName(), updateRequest.getPhone(), updateRequest.getAddress());

        boolean hasChanges = false;

        String newName = updateRequest.getName() != null ? updateRequest.getName().trim() : null;
        String newPhone = updateRequest.getPhone() != null ? updateRequest.getPhone().trim() : null;
        String newAddress = updateRequest.getAddress() != null ? updateRequest.getAddress().trim() : null;

        if (newName != null && !newName.equals(existingUser.getName())) {
            log.info("이름 변경: {} -> {}", existingUser.getName(), newName);
            existingUser.setName(newName.isEmpty() ? null : newName);
            hasChanges = true;
        }

        if (newPhone != null && !newPhone.equals(existingUser.getPhone())) {
            log.info("전화번호 변경: {} -> {}", existingUser.getPhone(), newPhone);
            existingUser.setPhone(newPhone.isEmpty() ? null : newPhone);
            hasChanges = true;
        }

        if (newAddress != null && !newAddress.equals(existingUser.getAddress())) {
            log.info("주소 변경: {} -> {}", existingUser.getAddress(), newAddress);
            existingUser.setAddress(newAddress.isEmpty() ? null : newAddress);
            hasChanges = true;
        }

        if (hasChanges) {
            Users savedUser = authRepository.save(existingUser);
            log.info("사용자 정보 업데이트 완료 - 이메일: {}, 수정시간: {}", userEmail, savedUser.getUpdateDt());
            return savedUser;
        } else {
            log.info("변경사항이 없어 업데이트를 건너뜁니다 - 이메일: {}", userEmail);
            return existingUser;
        }
    }
}