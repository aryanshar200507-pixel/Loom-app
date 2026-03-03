package com.jobtracker.users.services;



import com.jobtracker.users.dtos.UserRequestDto;
import com.jobtracker.users.dtos.UserResponseDto;

public interface UserServices {

  public UserResponseDto getUser(Long userId);
  public UserResponseDto updateUser(Long userId , UserRequestDto requestDto);
  public void deleteUser(Long userId);
  
  
}