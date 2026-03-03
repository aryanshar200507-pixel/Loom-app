package com.jobtracker.users.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import org.mapstruct.NullValuePropertyMappingStrategy;

import com.jobtracker.users.dtos.UserRequestDto;
import com.jobtracker.users.dtos.UserResponseDto;
import com.jobtracker.users.entity.Users;

@Mapper(componentModel = "spring")
public interface UserMappers {

  @Mapping(target = "userId", ignore = true)
  Users toEntity(UserRequestDto dto);

  UserResponseDto toDto(Users user);

  @Mapping(target = "userId", ignore = true)
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  Users updateUserFromDto(UserRequestDto dto, @MappingTarget Users entity);

}
