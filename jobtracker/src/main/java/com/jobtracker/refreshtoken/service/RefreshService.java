package com.jobtracker.refreshtoken.service;

import com.jobtracker.refreshtoken.entity.RefreshToken;
import com.jobtracker.users.entity.Users;

public interface RefreshService {
  RefreshToken createRefreshToken(String email);
  RefreshToken verifyRefreshToken(String token);
  void deleteByUser(Users user );
  void deleteExpiredTokens();

}
