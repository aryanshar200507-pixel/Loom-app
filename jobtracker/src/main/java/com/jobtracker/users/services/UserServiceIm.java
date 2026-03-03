package com.jobtracker.users.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobtracker.job.repository.JobRepository;
import com.jobtracker.refreshtoken.repository.RefreshRepository;
import com.jobtracker.users.dtos.UserRequestDto;
import com.jobtracker.users.dtos.UserResponseDto;
import com.jobtracker.users.entity.Users;
import com.jobtracker.users.mappers.UserMappers;
import com.jobtracker.users.repository.UserRepository;
import com.jobtracker.users.userexception.UserCustomError;

@Service
@Transactional
public class UserServiceIm implements UserServices {

  private final UserRepository userRepository;
  private final UserMappers userMappers;
  private final PasswordEncoder passwordEncoder;
  private final RefreshRepository refreshRepository;
  private final JobRepository jobRepository;
 

  UserServiceIm(UserRepository userRepository, UserMappers userMappers, PasswordEncoder passwordEncoder,
      RefreshRepository refreshRepository,JobRepository jobRepository) {
    this.userMappers = userMappers;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.refreshRepository=refreshRepository;
    this.jobRepository=jobRepository;
  }

  @Override
  public UserResponseDto getUser(Long userId) {
    return userRepository.findById(userId).map(userMappers::toDto)
        .orElseThrow(() -> new UserCustomError("User with id: " + userId + " is not found"));
  }



  // UPDATING DATA OF EXISTING USER
  @Override
  public UserResponseDto updateUser(Long userId, UserRequestDto requestDto) {
    Users existingUsers = userRepository.findById(userId)
        .orElseThrow(() -> new UserCustomError("User with id: " + userId + " ,is not found"));

    userRepository.findByEmail(requestDto.getEmail()).ifPresent(found -> {
      if (!found.getUserId().equals(userId)) {
        throw new UserCustomError("Email already taken");
      }
    });

    if (requestDto.getPassword() != null && !requestDto.getPassword().isBlank()) {
      existingUsers.setPassword(passwordEncoder.encode(requestDto.getPassword()));
    }

    Users updatedUsers = userMappers.updateUserFromDto(requestDto, existingUsers);

    Users saved = userRepository.save(updatedUsers);
    return userMappers.toDto(saved);

  }

  // DELETING USER DATA
  @Override
  public void deleteUser(Long userId) {
    Users users = userRepository.findById(userId).orElseThrow(() -> new UserCustomError("Users Not found"));

    refreshRepository.deleteAllByUser(users);

    jobRepository.deleteAllByUser(users);

    userRepository.delete(users);

  }


}