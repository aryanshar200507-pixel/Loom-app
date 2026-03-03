package com.jobtracker.auth.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jobtracker.users.entity.Users;
import com.jobtracker.users.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.core.userdetails.User;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Users user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

    return User
        .withUsername(email)
        .password(user.getPassword())
        .roles("USER")
        .build();
  }

}
