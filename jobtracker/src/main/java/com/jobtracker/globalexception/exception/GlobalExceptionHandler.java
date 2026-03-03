package com.jobtracker.globalexception.exception;

   
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.jobtracker.globalexception.dtos.ApiError;
import com.jobtracker.job.jobexception.JobCustomException;
import com.jobtracker.users.userexception.UserCustomError;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler{

  @ExceptionHandler(UserCustomError.class)
  public ResponseEntity<ApiError> handleUserNotFound(
    UserCustomError ex , HttpServletRequest request
  ){

    ApiError userError = new ApiError(
      HttpStatus.NOT_FOUND.value(),
      ex.getMessage(),
      request.getRequestURI()
    );

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(userError);
  }

  @ExceptionHandler(JobCustomException.class)
  public ResponseEntity<ApiError>handleJobNotFound(
    JobCustomException ex , HttpServletRequest request
  ){
    ApiError jobError = new ApiError(
      HttpStatus.NOT_FOUND.value(),
      ex.getMessage(),
      request.getRequestURI()
    );

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(jobError);
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<ApiError> handleInvalidEnum(
    MethodArgumentTypeMismatchException ex , HttpServletRequest request
  ){
      ApiError misMatchError = new ApiError(
        HttpStatus.NOT_FOUND.value(),
        "Invalid Parameter value",
        request.getRequestURI()
      );

      return ResponseEntity.badRequest().body(misMatchError);
  }
  
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleGeneric(
    Exception ex, HttpServletRequest request
  ){
      ApiError exceptionError = new ApiError(
        HttpStatus.NOT_FOUND.value(),
        "Something went wrong",
        request.getRequestURI()
      );

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exceptionError);
  }
}