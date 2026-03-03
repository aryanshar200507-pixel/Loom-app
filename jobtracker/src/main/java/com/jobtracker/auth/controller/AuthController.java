package com.jobtracker.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobtracker.auth.service.AuthService;
import com.jobtracker.refreshtoken.dtos.RefreshTokenRequestDto;
import com.jobtracker.users.dtos.LoginRequestDto;
import com.jobtracker.users.dtos.LoginResponseDto;
import com.jobtracker.users.dtos.UserRequestDto;
import com.jobtracker.users.dtos.UserResponseDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  public ResponseEntity<UserResponseDto> register(@RequestBody @Valid UserRequestDto requestDto) {
    return new ResponseEntity<>(authService.createUser(requestDto), HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDto> loginUser(@RequestBody LoginRequestDto loginRequestDto) {
    return ResponseEntity.ok(authService.login(loginRequestDto));
  }

  @PostMapping("/refresh")
  public ResponseEntity<LoginResponseDto> refreshToken(
      @RequestBody @Valid RefreshTokenRequestDto request) {

    return ResponseEntity.ok(authService.refreshToken(request.getRefreshToken()));
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(
      @RequestBody @Valid RefreshTokenRequestDto request) {

    authService.logout(request.getRefreshToken());
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<?> forgot(@RequestParam String email) {
    authService.forgotPassword(email);
    return ResponseEntity.ok("Reset link generated");
  }

  @PostMapping("/reset-password")
  public ResponseEntity<?> reset(
      @RequestParam String token,
      @RequestParam String password) {

    authService.resetPassword(token, password);
    return ResponseEntity.ok("Password updated");
  }
}
