package com.bootcamp.employees_api.feature.projects.mappers;

import com.bootcamp.employees_api.feature.projects.dto.ProjectCreateDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectSummaryDTO;
import com.bootcamp.employees_api.feature.projects.models.Project;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    Project projectCreateDtoToProject(ProjectCreateDTO projectCreateDTO);

    ProjectSummaryDTO projectToProjectSummaryDTO(Project project);

    ProjectDTO projectToProjectDTO(Project project);

    ProjectCreateDTO projectToProjectCreateDTO(Project project);

}
