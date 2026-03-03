package com.jobtracker.job.dtos;

import java.time.LocalDate;

import com.jobtracker.job.entity.JobStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobResponseDto {
    private Long jobId;
    private String companyName;
    private String jobRole;
    private String jobLink;
    private String notes;
    private JobStatus status;
    private LocalDate appliedDate;
}
 