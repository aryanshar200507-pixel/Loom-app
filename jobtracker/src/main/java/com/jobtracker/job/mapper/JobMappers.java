package com.jobtracker.job.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.jobtracker.job.dtos.JobRequestDto;
import com.jobtracker.job.dtos.JobResponseDto;
import com.jobtracker.job.entity.JobApplication;

@Mapper(componentModel = "spring")
public interface JobMappers {

  @Mapping(target = "jobId", ignore = true)
  @Mapping(target = "appliedDate", ignore = true)
  @Mapping(target = "user", ignore = true)
  JobApplication toEntity(JobRequestDto dto);

  JobResponseDto toDto(JobApplication jobApplication);

  @Mapping(target = "jobId", ignore = true)
  @Mapping(target = "appliedDate", ignore = true)
  @Mapping(target = "user", ignore = true)
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  JobApplication updateTheApplication(JobRequestDto dto, @MappingTarget JobApplication jobApplication);

}
