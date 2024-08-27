package com.bootcamp.employees_api.feature.projects;

import com.bootcamp.employees_api.feature.projects.dto.ProjectCreateDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectEditDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectSummaryDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/projects")
@Validated
@CrossOrigin
public class ProjectController {

    private final ProjectService _projectService;

    public ProjectController(ProjectService ProjectService) {
        _projectService = ProjectService;
    }

    @GetMapping("{projectId}")
    public ProjectDTO findProjectById(@Valid @PathVariable UUID projectId) {
        return _projectService.findProjectById(projectId);
    }

    @GetMapping()
    public List<ProjectSummaryDTO> findProjectsByName(@RequestParam(required = false) String name) {
        return _projectService.findAllProjects(name);
    }

    @PutMapping("/projects/{projectId}")
    public void editProjectById(@PathVariable UUID projectId, @Valid
    @RequestBody ProjectEditDTO project) {
        _projectService.updateProject(project, projectId);
    }

    @PostMapping()
    public ResponseEntity<UUID> addProject(@Valid @RequestBody ProjectCreateDTO ProjectCreateDTO) {
        UUID createdProjectId = _projectService.addProject(ProjectCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProjectId);
    }

    @DeleteMapping("{projectId}")
    public void deleteProjectById(@PathVariable UUID projectId) {
        _projectService.deleteProject(projectId);
    }

}
