package com.bootcamp.employees_api.feature.projects;

import com.bootcamp.employees_api.feature.employee.exceptions.EmployeeNotFoundException;
import com.bootcamp.employees_api.feature.employee.models.Employee;
import com.bootcamp.employees_api.feature.employee.repositories.EmployeeRepository;
import com.bootcamp.employees_api.feature.projects.dto.ProjectCreateDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectEditDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectSummaryDTO;
import com.bootcamp.employees_api.feature.projects.exceptions.ProjectIdIsNullException;
import com.bootcamp.employees_api.feature.projects.exceptions.ProjectNotFoundException;
import com.bootcamp.employees_api.feature.projects.mappers.MyProjectMapper;
import com.bootcamp.employees_api.feature.projects.mappers.ProjectMapper;
import com.bootcamp.employees_api.feature.projects.models.Project;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final MyProjectMapper myProjectMapper;
    private final EmployeeRepository employeeRepository;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper, MyProjectMapper myProjectMapper,
                          EmployeeRepository employeeRepository) {
        this.projectRepository = projectRepository;

        this.projectMapper = projectMapper;
        this.myProjectMapper = myProjectMapper;
        this.employeeRepository = employeeRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectSummaryDTO> findAllProjects(String name) {
        List<Project> allProjects;

        allProjects = name == null || name.isBlank() ? projectRepository.findAll() :
                projectRepository.findAllByNameContains(
                        name);

        return allProjects.stream()
                .map(myProjectMapper::projectToProjectSummaryDTO)
                .sorted((o1, o2) -> o2.id().compareTo(o1.id()))
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectDTO findProjectById(UUID projectId) {

        Optional<Project> optionalProject = projectRepository.findById(projectId);

        Project project = optionalProject.orElseThrow(() -> {
            log.error("Project not found at findProjectById()");
            return new ProjectNotFoundException(projectId);
        });

        return myProjectMapper.projectToProjectDTO(project);
    }

    @Transactional
    public UUID addProject(@Valid ProjectCreateDTO projectCreateDTO) {
        Project project = myProjectMapper.projectCreateDtoToProject(projectCreateDTO);
        Set<Employee> employeesList = new HashSet<>();

        projectCreateDTO.employeeIds().forEach(uuid -> {
            Employee employee =
                    employeeRepository.findById(uuid).orElseThrow(() -> {
                        log.error("Employee not found at addProject()");
                        return new EmployeeNotFoundException(uuid);
                    });
            employeesList.add(employee);
        });

        project.setEmployees(employeesList);

        return projectRepository.save(project).getId();
    }

    @Transactional
    public void deleteProject(UUID projectId) {

        Optional<Project> projectOpt = projectRepository.findById(projectId);

        if (projectOpt.isPresent()) {
            Project project = projectOpt.get();

            for (Employee employee : new HashSet<>(project.getEmployees())) {
                employee.getProjects().remove(project);
            }
            projectRepository.save(project);
            projectRepository.delete(project);

        } else {
            log.error("Project not found at deleteProject()");
            throw new ProjectNotFoundException(projectId);
        }
    }

    @Transactional
    public void updateProject(ProjectEditDTO projectEditDTO, UUID projectId) {
        if (projectId == null) {
            throw new ProjectIdIsNullException("projectEditDTO", "ProjectId is not in path.");
        }

        Project projectToEdit = projectRepository.findById(projectId).orElseThrow(() -> {
            log.error("Project not found at updateProject()");
            return new ProjectNotFoundException(projectId);
        });

        projectToEdit.setName(projectEditDTO.name());
        projectToEdit.setDescription(projectEditDTO.description());

        List<Employee> employees = new ArrayList<>();
        for (UUID userId : projectEditDTO.employeeIds()) {
            Employee employee = employeeRepository.findById(userId).orElseThrow(() -> {
                log.error("Employee not found for id: " + userId);
                return new EmployeeNotFoundException(userId);
            });
            employees.add(employee);
        }

        projectToEdit.getEmployees().clear();
        projectToEdit.getEmployees().addAll(employees);

        projectRepository.save(projectToEdit);
    }
}