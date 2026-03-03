package com.jobtracker.globalexception.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ApiError {
  private int status;
  private String message;
  private String path;

  private LocalDateTime timestamp = LocalDateTime.now();

  public ApiError(int status , String message ,String path){
      this.status=status;
      this.message=message;
      this.path=path;
  }
}
