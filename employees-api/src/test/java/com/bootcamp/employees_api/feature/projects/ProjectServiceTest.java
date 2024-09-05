package com.bootcamp.employees_api.feature.projects;

import com.bootcamp.employees_api.feature.employee.repositories.EmployeeRepository;
import com.bootcamp.employees_api.feature.projects.dto.ProjectDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectSummaryDTO;
import com.bootcamp.employees_api.feature.projects.models.Project;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private ProjectMapper projectMapper;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private ProjectService underTest;

    private AutoCloseable autoCloseable;

    private Project catProject;

    @BeforeEach
    void setUp() {
        catProject = new Project();
        catProject.setId(UUID.randomUUID());
        catProject.setName("Glaskanie kota");
        catProject.setDescription("Bardzo mocne glaskanie wszystkich kotków");

        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new ProjectService(projectRepository, projectMapper, employeeRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void shouldFindAllProjects() {
        // arrange
        String name = "Project Name";
        List<Project> projects = new ArrayList<>(List.of(catProject));
        when(projectRepository.findAllByNameContains(name)).thenReturn(projects);

        // act
        List<ProjectSummaryDTO> result = underTest.findAllProjects(name);

        // assert
        assertNotNull(result);
        verify(projectRepository).findAllByNameContains(name);
        verify(projectMapper, times(projects.size())).projectToProjectSummaryDTO(
                any(Project.class));
    }

    @Test
    void shouldFindProjectById() {
        // arrange
        UUID projectId = UUID.randomUUID();
        Project project = new Project();
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(projectMapper.projectToProjectDTO(project)).thenReturn(
                new ProjectDTO(project.getId(), project.getName(), project.getDescription(),
                               List.of()));

        // act
        ProjectDTO result = underTest.findProjectById(projectId);

        // assert
        assertNotNull(result);
        verify(projectRepository).findById(projectId);
        verify(projectMapper).projectToProjectDTO(project);
    }

}

