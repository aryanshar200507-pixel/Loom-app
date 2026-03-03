package com.jobtracker.users.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobtracker.users.dtos.UserRequestDto;
import com.jobtracker.users.dtos.UserResponseDto;
import com.jobtracker.users.services.UserServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UsersController {

  private UserServices userServices;

  public UsersController(UserServices userServices){
    this.userServices=userServices;
  }

  @GetMapping("{userId}")
  public UserResponseDto getAllData(@Valid @PathVariable Long userId) {
    return userServices.getUser(userId);
  }


  @PutMapping("/edit/{user_id}")
  public ResponseEntity<UserResponseDto> updateExistingData(@Valid @PathVariable Long user_id, @RequestBody UserRequestDto requestDto) {
    return ResponseEntity.status(HttpStatus.OK).body(userServices.updateUser(user_id, requestDto));
  }

  @DeleteMapping("/delete/{user_id}")
  public ResponseEntity<Void> deleteData(@Valid@PathVariable Long user_id){
      userServices.deleteUser(user_id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
