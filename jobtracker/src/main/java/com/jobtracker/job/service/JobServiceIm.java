package com.jobtracker.job.service;

import java.time.LocalDate;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobtracker.auth.securityconfig.SecurityBean;
import com.jobtracker.job.dtos.JobRequestDto;
import com.jobtracker.job.dtos.JobResponseDto;
import com.jobtracker.job.dtos.JobStatusResponseDto;
import com.jobtracker.job.entity.JobApplication;
import com.jobtracker.job.entity.JobStatus;
import com.jobtracker.job.jobexception.JobCustomException;
import com.jobtracker.job.mapper.JobMappers;
import com.jobtracker.job.repository.JobRepository;
import com.jobtracker.users.entity.Users;
import com.jobtracker.users.repository.UserRepository;
import com.jobtracker.users.userexception.UserCustomError;

@Service
@Transactional
public class JobServiceIm implements JobService{

  private JobRepository jobRepository;
  private UserRepository userRepository;
  private JobMappers jobMappers;

  public JobServiceIm(JobRepository jobRepository ,UserRepository userRepository, JobMappers jobMappers){
      this.jobRepository=jobRepository;
      this.userRepository=userRepository;
      this.jobMappers=jobMappers;
  }

  @Override
  public Page<JobResponseDto> getJobs(int size, int page, JobStatus status, String sortBy, String direction) {
    String email = SecurityBean.getCurrentUserEmail();

    Users users = userRepository.findByEmail(email).orElseThrow(() -> new UserCustomError("User not found"));

    Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

    

    Pageable pageable = PageRequest.of(page, size,sort);
    Page<JobApplication> jobsPage;

    if (status != null) {
      jobsPage = jobRepository.findByUserAndStatus(users, status, pageable);
    }else{
      jobsPage = jobRepository.findByUser(users, pageable);
    }

    return jobsPage.map(jobMappers::toDto);
  }

  @Override
  public JobResponseDto createNewJob(JobRequestDto dto) {
    String email = SecurityBean.getCurrentUserEmail();

    Users users = userRepository.findByEmail(email).orElseThrow(()-> new UserCustomError("User not found"));

    JobApplication job = jobMappers.toEntity(dto);
    job.setUser(users);
    job.setAppliedDate(LocalDate.now());
    job.setStatus(dto.getStatus() != null ? dto.getStatus(): JobStatus.APPLIED);

    JobApplication saved = jobRepository.save(job);

    return jobMappers.toDto(saved);
  }

  @Override
  public JobResponseDto updateJob(Long jobId, JobRequestDto requestDto) {
  
    String email = SecurityBean.getCurrentUserEmail();
    
    Users users = userRepository.findByEmail(email).orElseThrow(()-> new UserCustomError("User not found"));

    JobApplication job = jobRepository.findByJobIdAndUser(jobId, users).orElseThrow(()-> new JobCustomException("Job not found or access denied"));

    jobMappers.updateTheApplication(requestDto, job);

    JobApplication saved = jobRepository.save(job);

    return jobMappers.toDto(saved);
  }

  @Override
  public void deleteJob(Long jobId) {
    String email = SecurityBean.getCurrentUserEmail();

    Users users = userRepository.findByEmail(email).orElseThrow(()-> new UserCustomError("User not found"));

    JobApplication job = jobRepository.findByJobIdAndUser(jobId, users).orElseThrow(()-> new JobCustomException("Job not found or access denied"));

    jobRepository.delete(job);
  }

  @Override
  public JobStatusResponseDto getStatus() {
    String email = SecurityBean.getCurrentUserEmail();

    Users users = userRepository.findByEmail(email).orElseThrow(()-> new UserCustomError("User not found"));

    List<Object[]>rows = jobRepository.countByStatus(users);

    Map<JobStatus,Long> map = new EnumMap<>(JobStatus.class);
    long total = 0;

    for(Object[] row : rows){
      JobStatus status = (JobStatus) row[0];
      long count = (long) row[1];
      map.put(status, count);
      total += count;
    }

    JobStatusResponseDto dto = new JobStatusResponseDto();

    dto.setTotal(total);
    dto.setStatusCount(map);

    return dto;
  }

  
}
