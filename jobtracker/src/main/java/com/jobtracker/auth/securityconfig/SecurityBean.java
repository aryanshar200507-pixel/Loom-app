package com.jobtracker.auth.securityconfig;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.jobtracker.users.userexception.UserCustomError;


public class SecurityBean {

  public static String getCurrentUserEmail() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new UserCustomError("No authenticated user found in context");
    }

    return authentication.getName();
  }
}
