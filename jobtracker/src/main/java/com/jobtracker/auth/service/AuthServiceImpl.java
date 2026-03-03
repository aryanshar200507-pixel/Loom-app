package com.jobtracker.auth.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobtracker.auth.securityconfig.JwtUtil;
import com.jobtracker.config.forgotpassword.entity.PasswordResetToken;
import com.jobtracker.config.forgotpassword.repository.PasswordResetTokenRepo;
import com.jobtracker.refreshtoken.entity.RefreshToken;
import com.jobtracker.refreshtoken.service.RefreshService;
import com.jobtracker.users.dtos.LoginRequestDto;
import com.jobtracker.users.dtos.LoginResponseDto;
import com.jobtracker.users.dtos.UserRequestDto;
import com.jobtracker.users.dtos.UserResponseDto;
import com.jobtracker.users.entity.Users;
import com.jobtracker.users.mappers.UserMappers;
import com.jobtracker.users.repository.UserRepository;
import com.jobtracker.users.userexception.UserCustomError;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final RefreshService refreshService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserMappers userMappers;
    private final PasswordResetTokenRepo passwordResetTokenRepo;

    private final EmailService emailService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public AuthServiceImpl(RefreshService refreshService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder,
            UserRepository userRepository, UserMappers userMappers, PasswordResetTokenRepo passwordResetTokenRepo,
            EmailService emailService) {
        this.refreshService = refreshService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.userMappers = userMappers;
        this.passwordResetTokenRepo = passwordResetTokenRepo;
        this.emailService = emailService;
    }

    @Override
    public UserResponseDto createUser(UserRequestDto requestDto) {
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new UserCustomError("The Email address" + requestDto.getEmail() + " already exists");
        }

        Users user = userMappers.toEntity(requestDto);
        // ENCODED PASSWORD
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        Users savedUsers = userRepository.save(user);
        return userMappers.toDto(savedUsers);

    }

    @Override
    public LoginResponseDto refreshToken(String token) {

        RefreshToken refreshToken = refreshService.verifyRefreshToken(token);

        String newAccessToken = jwtUtil.generateAccessToken(refreshToken.getUser().getEmail());

        RefreshToken newRefreshToken = refreshService.createRefreshToken(refreshToken.getUser().getEmail());

        return LoginResponseDto.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken.getToken())
                .tokenType("Bearer")
                .user(userMappers.toDto(refreshToken.getUser()))
                .build();
    }

    @Override
    public void logout(String token) {
        RefreshToken refreshToken = refreshService.verifyRefreshToken(token);
        refreshService.deleteByUser(refreshToken.getUser());
    }

    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        Users user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
            throw new UsernameNotFoundException("Invalid email or password");

        }

        String accessToken = jwtUtil.generateAccessToken(user.getEmail());
        RefreshToken refreshToken = refreshService.createRefreshToken(user.getEmail());

        return LoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .user(userMappers.toDto(user))
                .build();
    }

    @Override
    public void forgotPassword(String email) {

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserCustomError("User not found"));

        // 🔥 delete previous token if exists
        passwordResetTokenRepo.deleteByUser(user);

        // generate new token
        String token = UUID.randomUUID().toString();

        PasswordResetToken reset = new PasswordResetToken();
        reset.setToken(token);
        reset.setUser(user);
        reset.setExpiry(LocalDateTime.now().plusMinutes(15));

        passwordResetTokenRepo.save(reset);

        String link = frontendUrl + "/reset-password?token=" + token;

        emailService.sendResetEmail(user.getEmail(), link);
    }

    @Override
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken reset = passwordResetTokenRepo.findByToken(token)
                .orElseThrow(() -> new UserCustomError("Invalid token"));

        if (reset.getExpiry().isBefore(LocalDateTime.now())) {
            throw new UserCustomError("Token expired");
        }

        Users user = reset.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepo.delete(reset);
    }

}
