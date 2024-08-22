package com.bootcamp.employees_api.feature.employee.mappers;

import com.bootcamp.employees_api.feature.employee.dto.ProjectCreateDTO;
import com.bootcamp.employees_api.feature.employee.dto.ProjectDTO;
import com.bootcamp.employees_api.feature.employee.models.Project;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    Project projectCreateDtoToProject(ProjectCreateDTO projectCreateDTO);

    ProjectDTO projectToProjectDTO(Project project);
}
