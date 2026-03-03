package com.jobtracker.config.forgotpassword.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobtracker.config.forgotpassword.entity.PasswordResetToken;
import com.jobtracker.users.entity.Users;

public interface PasswordResetTokenRepo extends JpaRepository<PasswordResetToken,Long>{

  Optional<PasswordResetToken> findByToken(String token);
  Optional<PasswordResetToken> deleteByUser(Users user);
  
}