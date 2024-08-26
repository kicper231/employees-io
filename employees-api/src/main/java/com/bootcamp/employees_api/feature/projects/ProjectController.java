package com.bootcamp.employees_api.feature.projects;

import com.bootcamp.employees_api.feature.projects.dto.ProjectCreateDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectEditDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/Projects")
@Validated
public class ProjectController {

    private final ProjectService _projectService;

    public ProjectController(ProjectService ProjectService) {
        _projectService = ProjectService;
    }

    @GetMapping("{ProjectId}")
    public ProjectDTO findProjectById(@Valid @PathVariable UUID ProjectId) {
        return _projectService.findProjectById(ProjectId);
    }

    @GetMapping()
    public List<ProjectDTO> findProjectsByName(@RequestParam(required = false) String name) {
        return _projectService.findAllProjects(name);
    }

    @PutMapping("/Projects/{ProjectId}")
    public void editProjectById(@PathVariable UUID ProjectId, @Valid
    @RequestBody ProjectEditDTO project) {
        _projectService.updateProject(project, ProjectId);
    }

    @PostMapping()
    public ResponseEntity<UUID> addProject(@Valid @RequestBody ProjectCreateDTO ProjectCreateDTO) {
        UUID createdProjectId = _projectService.addProject(ProjectCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProjectId);
    }

    @DeleteMapping("{ProjectId}")
    public void deleteProjectById(@PathVariable UUID ProjectId) {
        _projectService.deleteProject(ProjectId);
    }

}
