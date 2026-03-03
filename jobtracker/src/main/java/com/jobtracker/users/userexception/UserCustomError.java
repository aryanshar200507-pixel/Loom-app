package com.jobtracker.users.userexception;

public class UserCustomError extends RuntimeException {
  public UserCustomError(String message){
    super(message);
  }
}
