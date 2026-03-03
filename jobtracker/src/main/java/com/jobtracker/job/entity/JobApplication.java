package com.jobtracker.job.entity;

import java.time.LocalDate;

import com.jobtracker.users.entity.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "job_application")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long jobId;

  @NotBlank
  @Size(min = 2)
  private String companyName;

  @NotBlank
  @Size(min = 2)
  private String jobRole;

  private String jobLink;

  private String notes;

  @Enumerated(EnumType.STRING)
  private JobStatus status;

  private LocalDate appliedDate;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;


}
