package com.jobtracker.users.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity(name = "Users")
@Table(name = "user_table")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Users {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)

  private Long userId;

  @NotBlank
  @Size(min = 2, max = 25)

  private String name;

  @NotBlank
  @Email(message = "Please Enter Email")
  @Column(unique = true , nullable = false)
  @Size(min = 5)

  private String email;

  @NotBlank
  @Size(min = 8)

  private String password;
}
