package com.bootcamp.employees_api.mappers;

import com.bootcamp.employees_api.DTO.ProjectCreateDTO;
import com.bootcamp.employees_api.DTO.ProjectDTO;
import com.bootcamp.employees_api.models.Project;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    Project projectCreateDtoToProject(ProjectCreateDTO projectCreateDTO);

    ProjectDTO projectToProjectDTO(Project project);
}
