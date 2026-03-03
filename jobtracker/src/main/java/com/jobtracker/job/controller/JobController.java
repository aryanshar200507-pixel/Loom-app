package com.jobtracker.job.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobtracker.job.dtos.JobRequestDto;
import com.jobtracker.job.dtos.JobResponseDto;
import com.jobtracker.job.dtos.JobStatusResponseDto;
import com.jobtracker.job.entity.JobStatus;
import com.jobtracker.job.service.JobService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/job")
public class JobController {

  private final JobService jobService;

  public JobController(JobService jobService) {
    this.jobService = jobService;
  }

  @GetMapping("/jobData")
  public ResponseEntity<Page<JobResponseDto>> getData(

      @RequestParam(defaultValue = "5") int size,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(required = false) JobStatus status,
      @RequestParam(defaultValue = "appliedDate") String sort,
      @RequestParam(defaultValue = "desc") String direction) {
    return ResponseEntity.ok(jobService.getJobs(size, page, status, sort, direction));
  }

  @GetMapping("/stats")
  public ResponseEntity<JobStatusResponseDto> getStats() {
    return ResponseEntity.ok(jobService.getStatus());
  }

  @PostMapping("/add")
  public ResponseEntity<JobResponseDto> createJobRequest(@Valid @RequestBody JobRequestDto requestDto) {
    JobResponseDto response = jobService.createNewJob(requestDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PutMapping("/edit/{jobId}")
  public ResponseEntity<JobResponseDto> updateJobDetails(@Valid @PathVariable Long jobId,
      @RequestBody JobRequestDto dto) {
    return ResponseEntity.ok(jobService.updateJob(jobId, dto));
  }

  @DeleteMapping("/delete/{jobId}")
  public ResponseEntity<Void> deleteExistingJob(@Valid @PathVariable Long jobId) {
    jobService.deleteJob(jobId);
    return ResponseEntity.noContent().build();
  }

}
