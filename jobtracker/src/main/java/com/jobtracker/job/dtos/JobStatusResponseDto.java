package com.jobtracker.job.dtos;

import java.util.Map;

import com.jobtracker.job.entity.JobStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobStatusResponseDto {
  
  private Long total;

  private Map<JobStatus,Long> statusCount;

}
