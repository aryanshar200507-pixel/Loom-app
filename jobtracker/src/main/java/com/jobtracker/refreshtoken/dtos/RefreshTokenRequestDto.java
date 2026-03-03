package com.jobtracker.refreshtoken.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenRequestDto {
  @NotBlank(message = "Refresh token is required")
  private String refreshToken;
}
