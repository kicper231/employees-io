package com.bootcamp.employees_api.feature.projects;

import com.bootcamp.employees_api.feature.projects.dto.ProjectCreateDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectEditDTO;
import com.bootcamp.employees_api.feature.projects.exceptions.ProjectNotFoundException;
import com.bootcamp.employees_api.feature.projects.models.Project;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(ProjectRepository ProjectRepository, ProjectMapper projectMapper) {
        this.projectRepository = ProjectRepository;

        this.projectMapper = projectMapper;
    }

    @Transactional(readOnly = true)
    public List<ProjectDTO> findAllProjects(String name) {
        List<Project> allProjects;

        allProjects = name == null || name.isBlank() ? projectRepository.findAll() :
                projectRepository.findAllByNameContains(
                        name);

        return allProjects.stream().map(projectMapper::projectToProjectDTO).toList();
    }

    @Transactional(readOnly = true)
    public ProjectDTO findProjectById(UUID ProjectId) {

        Optional<ProjectDTO> result = projectRepository.findById(ProjectId).map(
                projectMapper::projectToProjectDTO);

        return result.orElseThrow(() -> {
            log.error("Project not found at findProjectById()");
            return new ProjectNotFoundException(ProjectId);
        });
    }

    @Transactional
    public UUID addProject(@Valid ProjectCreateDTO ProjectCreateDTO) {
        Project Project = projectMapper.projectCreateDtoToProject(ProjectCreateDTO);

        return projectRepository.save(Project).getId();
    }

    @Transactional
    public void deleteProject(UUID ProjectId) {

        if (projectExist(ProjectId)) {
            projectRepository.deleteById(ProjectId);
            return;
        }
        log.error("Project not found at deleteProject()");
        throw new ProjectNotFoundException(ProjectId);
    }

    @Transactional
    public void updateProject(@Valid ProjectEditDTO ProjectEditDTO, UUID ProjectId) {

    }

    public boolean projectExist(UUID ProjectId) {
        return true;
    }

}