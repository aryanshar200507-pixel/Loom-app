package com.jobtracker.job.dtos;

import com.jobtracker.job.entity.JobStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobRequestDto {
  @NotBlank
  private String companyName;
  @NotBlank
  private String jobRole;

  private String jobLink;
  @NotNull
  private JobStatus status;
  
  private String notes;
}
