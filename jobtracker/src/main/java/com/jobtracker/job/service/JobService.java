package com.jobtracker.job.service;

import org.springframework.data.domain.Page;

import com.jobtracker.job.dtos.JobRequestDto;
import com.jobtracker.job.dtos.JobResponseDto;
import com.jobtracker.job.dtos.JobStatusResponseDto;
import com.jobtracker.job.entity.JobStatus;

public interface JobService {

  public Page<JobResponseDto> getJobs(int size, int page, JobStatus status, String sortBy, String direction);

  public JobResponseDto createNewJob(JobRequestDto dto);

  public JobResponseDto updateJob(Long job_id, JobRequestDto requestDto);

  public void deleteJob(Long job_id);

  public JobStatusResponseDto getStatus();

}