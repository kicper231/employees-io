package com.bootcamp.employees_api.feature.projects.mappers;

import com.bootcamp.employees_api.feature.employee.dto.EmployeeSummaryDTO;
import com.bootcamp.employees_api.feature.employee.mappers.MyEmployeeMapper;
import com.bootcamp.employees_api.feature.projects.dto.ProjectCreateDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectSummaryDTO;
import com.bootcamp.employees_api.feature.projects.models.Project;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class MyProjectMapper{

    final MyEmployeeMapper myEmployeeMapper;

    MyProjectMapper(MyEmployeeMapper myEmployeeMapper) {this.myEmployeeMapper = myEmployeeMapper;}

    public Project projectCreateDtoToProject(ProjectCreateDTO projectCreateDTO) {
        if ( projectCreateDTO == null ) {
            return null;
        }

        Project.ProjectBuilder project = Project.builder();

        project.name( projectCreateDTO.name() );
        project.description( projectCreateDTO.description() );

        return project.build();
    }

    public ProjectSummaryDTO projectToProjectSummaryDTO(Project project) {
        if ( project == null ) {
            return null;
        }

        UUID id = null;
        String name = null;
        String description = null;

        id = project.getId();
        name = project.getName();
        description = project.getDescription();

        return new ProjectSummaryDTO( id, name, description );
    }

    public ProjectDTO projectToProjectDTO(Project project) {
        if ( project == null ) {
            return null;
        }

        UUID id = null;
        String name = null;
        String description = null;
        List<EmployeeSummaryDTO> employees = null;

        id = project.getId();
        name = project.getName();
        description = project.getDescription();
        employees =
                project.getEmployees().stream().map(myEmployeeMapper::employeeToEmployeeSummaryDTO).collect(
                Collectors.toList());

        return new ProjectDTO( id, name, description, employees );
    }

}