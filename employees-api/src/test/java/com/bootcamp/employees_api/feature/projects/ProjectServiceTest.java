package com.bootcamp.employees_api.feature.projects;

import com.bootcamp.employees_api.exception.EntityNotFoundException;
import com.bootcamp.employees_api.feature.employee.repositories.EmployeeRepository;
import com.bootcamp.employees_api.feature.projects.dto.ProjectCreateDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectEditDTO;
import com.bootcamp.employees_api.feature.projects.dto.ProjectSummaryDTO;
import com.bootcamp.employees_api.feature.projects.exceptions.ProjectIdIsNullException;
import com.bootcamp.employees_api.feature.projects.exceptions.ProjectNotFoundException;
import com.bootcamp.employees_api.feature.projects.models.Project;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
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
                               List.of()
                ));

        // act
        ProjectDTO result = underTest.findProjectById(projectId);

        // assert
        assertNotNull(result);
        verify(projectRepository).findById(projectId);
        verify(projectMapper).projectToProjectDTO(project);
    }

    @Test
    void findProjectByIdshouldThrowErrorThenProjectByIdNotFound() {
        // arrange
        UUID projectId = provideUUID();
        Project project = new Project();
        when(projectRepository.findById(projectId)).thenReturn(Optional.empty());
        when(projectMapper.projectToProjectDTO(project)).thenReturn(
                new ProjectDTO(project.getId(), project.getName(), project.getDescription(),
                               List.of()
                ));

        // act assert
        assertThatExceptionOfType(EntityNotFoundException.class).isThrownBy(
                () -> underTest.findProjectById(projectId));
        verify(projectRepository).findById(projectId);
    }

    @Test
    void updateProjectShouldThrowProjectIdIsNullExceptionWhenProjectIdIsNull() {
        // act assert
        assertThatExceptionOfType(ProjectIdIsNullException.class).isThrownBy(
                () -> underTest.updateProject(provideProjectEditDTO(), null));

    }

    @Test
    void updateProjectShouldThrowProjectNotFoundExceptionWhenProjectDoesNotExist() {
        UUID projectId = UUID.randomUUID();
        ProjectEditDTO project = provideProjectEditDTO();
        when(projectRepository.findById(any())).thenThrow(new ProjectNotFoundException(projectId));

        // act assert
        assertThatExceptionOfType(ProjectNotFoundException.class).isThrownBy(
                () -> underTest.updateProject(project, projectId));

    }

    @Test
    void updateProjectShouldUpdateEmployeesWhenEmployeeIdsAreProvided() {

        UUID projectId = provideUUID();
        ProjectEditDTO project = provideProjectEditDTO();
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(provideProject()));

        // act
        underTest.updateProject(project, projectId);

        // assert
        verify(projectRepository).save(any());

    }

    @Test
    void deleteProjectShouldThrowProjectNotFoundExceptionWhenProjectDoesNotExist() {
        UUID projectId = UUID.randomUUID();
        when(projectRepository.findById(any())).thenThrow(new ProjectNotFoundException(projectId));

        // act assert
        assertThatExceptionOfType(ProjectNotFoundException.class).isThrownBy(
                () -> underTest.deleteProject(projectId));

    }

    @Test
    void addProjectShouldThrowEmployeeNotFoundExceptionWhenOneOfEmployeeDoesNotExist() {

        ProjectCreateDTO project = provideCreateDTO();
        when(employeeRepository.findById(provideUUID())).thenThrow(
                new ProjectNotFoundException(provideUUID()));

        // act assert
        assertThatExceptionOfType(ProjectNotFoundException.class).isThrownBy(
                () -> underTest.addProject(project));
    }

    private ProjectEditDTO provideProjectEditDTO() {
        return ProjectEditDTO.builder()
                .description("opis dlugi")
                .name("bardzo krótki Opis bardzo")
                .employeeIds(new ArrayList<>())
                .build();
    }

    private ProjectCreateDTO provideCreateDTO() {
        return ProjectCreateDTO.builder()
                .description("opis dlugi")
                .name("bardzo krótki Opis bardzo")
                .employeeIds(new ArrayList<>(List.of(provideUUID())))
                .build();
    }

    private Project provideProject() {
        return Project.builder().id(provideUUID())
                .description("opis dlugi")
                .name("bardzo krótki Opis bardzo")
                .employees(new HashSet<>())
                .build();
    }

    private UUID provideUUID() {
        return UUID.fromString("bc2d0f53-5041-46e8-a14c-267875a49f0c");
    }

}

