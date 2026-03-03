package com.jobtracker.refreshtoken.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobtracker.refreshtoken.entity.RefreshToken;
import com.jobtracker.users.entity.Users;

public interface RefreshRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUser(Users user);

    void deleteByUser(Users user);

    void deleteAllByUser(Users user);
}