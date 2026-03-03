package com.jobtracker.job.jobexception;

public class JobCustomException extends RuntimeException{
  public JobCustomException(String message){
    super(message);
  }
}
