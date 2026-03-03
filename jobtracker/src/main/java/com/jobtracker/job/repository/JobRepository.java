package com.jobtracker.job.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jobtracker.job.entity.JobApplication;
import com.jobtracker.job.entity.JobStatus;
import com.jobtracker.users.entity.Users;

public interface JobRepository extends JpaRepository<JobApplication, Long> {

  Page<JobApplication> findByUserAndStatus(Users users, JobStatus status, Pageable pageable);

  Page<JobApplication> findByUser(Users users, Pageable pageable);

  Optional<JobApplication> findByJobIdAndUser(Long jobId, Users users);

  @Query("SELECT j.status, COUNT(j) FROM JobApplication j WHERE j.user = :user GROUP BY j.status")
  List<Object[]> countByStatus(@Param("user") Users users);

  void deleteAllByUser(Users user);

}