package com.jobtracker.refreshtoken.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.jobtracker.refreshtoken.entity.RefreshToken;
import com.jobtracker.refreshtoken.repository.RefreshRepository;
import com.jobtracker.users.entity.Users;
import com.jobtracker.users.repository.UserRepository;
import com.jobtracker.users.userexception.UserCustomError;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RefreshServiceIm implements RefreshService {

    private final RefreshRepository refreshRepository;
    private final UserRepository userRepository;

    @Value("${jwt.refresh.expiration.ms}")
    private long refreshTokenExpiration;

    public RefreshServiceIm(RefreshRepository refreshRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public RefreshToken createRefreshToken(String email) {

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserCustomError("User not Found"));

        // delete old token if exists
        refreshRepository.deleteAllByUser(user);
        refreshRepository.flush();

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedAt(LocalDateTime.now());
        refreshToken.setExpiryDate(LocalDateTime.now()
                .plusSeconds(refreshTokenExpiration / 1000));

        return refreshRepository.save(refreshToken);
    }

    @Override
    public RefreshToken verifyRefreshToken(String token) {

        RefreshToken refreshToken = refreshRepository.findByToken(token)
                .orElseThrow(() -> new UserCustomError("Invalid refresh token"));

        // If expired → delete it and force login
        if (refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshRepository.delete(refreshToken);
            throw new UserCustomError("Refresh token expired. Please login again");
        }

        return refreshToken;
    }

    @Override
    public void deleteByUser(Users user) {
        refreshRepository.deleteByUser(user);
    }

    @Override
    @Scheduled(fixedRate = 600000)
    public void deleteExpiredTokens() {
      refreshRepository.findAll().stream().filter(t -> t.getExpiryDate().isBefore(LocalDateTime.now())).forEach(refreshRepository::delete);
    }

    
}