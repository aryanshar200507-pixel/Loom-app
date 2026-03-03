package com.jobtracker.auth.service;

import com.jobtracker.users.dtos.LoginRequestDto;
import com.jobtracker.users.dtos.LoginResponseDto;
import com.jobtracker.users.dtos.UserRequestDto;
import com.jobtracker.users.dtos.UserResponseDto;

public interface AuthService {
    LoginResponseDto refreshToken(String refreshToken);

    void logout(String refreshToken);

    LoginResponseDto login(LoginRequestDto dto);

    UserResponseDto createUser(UserRequestDto dto);

    void forgotPassword(String email);

    void resetPassword(String token, String newPassword);
}
