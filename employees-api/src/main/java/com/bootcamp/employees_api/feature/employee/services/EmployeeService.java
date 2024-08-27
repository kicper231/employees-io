package com.bootcamp.employees_api.feature.employee.services;

import com.bootcamp.employees_api.feature.employee.dto.*;
import com.bootcamp.employees_api.feature.employee.exceptions.EmployeeIdIsNullException;
import com.bootcamp.employees_api.feature.employee.exceptions.EmployeeIsOwnManagerException;
import com.bootcamp.employees_api.feature.employee.exceptions.EmployeeNotFoundException;
import com.bootcamp.employees_api.feature.employee.exceptions.ManagerNotFoundException;
import com.bootcamp.employees_api.feature.employee.mappers.EmployeeMapper;
import com.bootcamp.employees_api.feature.employee.mappers.SkillMapper;
import com.bootcamp.employees_api.feature.employee.models.Employee;
import com.bootcamp.employees_api.feature.employee.models.Skill;
import com.bootcamp.employees_api.feature.employee.repositories.EmployeeRepository;
import com.bootcamp.employees_api.feature.projects.ProjectRepository;
import com.bootcamp.employees_api.feature.projects.exceptions.ProjectIdIsNullException;
import com.bootcamp.employees_api.feature.projects.exceptions.ProjectNotFoundException;
import com.bootcamp.employees_api.feature.projects.models.Project;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class EmployeeService implements IEmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final SkillMapper skillMapper;
    private final ProjectRepository projectRepository;

    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper, SkillMapper skillMapper,
                           ProjectRepository projectRepository) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.skillMapper = skillMapper;
        this.projectRepository = projectRepository;

    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeSummaryDTO> findAllEmployees(String name) {
        List<Employee> allEmployees;

        allEmployees = name == null || name.isBlank()
                ? employeeRepository.findAll()
                : employeeRepository.findAllByNameContains(
                name);

        return allEmployees.stream().map(employeeMapper::employeeToEmployeeSummaryDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDTO findEmployeeById(UUID employeeId) {

        Optional<EmployeeDTO> employeeDTOoptional = employeeRepository.findById(employeeId).map(
                employeeMapper::employeeToEmployeeDto);

        return employeeDTOoptional.orElseThrow(() -> {
            log.error("Employee not found at findEmployeeById()");
            return new EmployeeNotFoundException(employeeId);
        });
    }

    @Override
    @Transactional
    public void deleteEmployee(UUID employeeId) {

        Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);

        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            for (Project project : new HashSet<>(employee.getProjects())) {
                project.getEmployees().remove(employee);
            }
            employeeRepository.save(employee);
            employeeRepository.delete(employee);
        } else {
            log.error("Employee not found at deleteEmployee()");
            throw new EmployeeNotFoundException(employeeId);
        }
    }

    @Override
    @Transactional
    public void updateEmployee(EmployeeEditDTO employeeEditDTO, UUID employeeId) {

        if (employeeId == null) {
            throw new EmployeeIdIsNullException("employeeEditDTO", "EmployeeId is not in path.");
        }

        Employee employeeToEdit = employeeRepository.findById(employeeId).orElseThrow(() -> {
            log.error("Employee not found at updateEmployee()");
            return new EmployeeNotFoundException(employeeId);
        });

        employeeToEdit.setName(
                Objects.requireNonNullElse(employeeEditDTO.name(), employeeToEdit.getName()));

        employeeToEdit.setSurname(
                Objects.requireNonNullElse(employeeEditDTO.surname(), employeeToEdit.getSurname()));

        employeeToEdit.setHireDate(Objects.requireNonNullElse(employeeEditDTO.hireDate(),
                                                              employeeToEdit.getHireDate()
        ));

        if (employeeEditDTO.skills() != null) {
            setSkills(employeeToEdit, employeeEditDTO.skills());
        }

        if (employeeEditDTO.projectIds() != null) {
            setProjects(employeeToEdit, employeeEditDTO.projectIds());
        }

        setManager(employeeToEdit, employeeEditDTO.managerId());
        employeeRepository.save(employeeToEdit);

    }

    @Override
    @Transactional
    public UUID addEmployee(EmployeeCreateDTO employeeCreateDTO) {
        Employee employee = employeeMapper.employeeCreateDtoToEmployee(employeeCreateDTO);

        employee.getSkills().forEach(skill -> skill.setEmployee(employee));
        setProjects(employee, employeeCreateDTO.projectIds());
        setManager(employee, employeeCreateDTO.managerId());

        return employeeRepository.save(employee).getId();
    }

    private void setManager(Employee employee, UUID managerId) {
        if (managerId != null) {
            if (employee.getId() == managerId) {
                log.error("Employee cannot be his own manager");
                throw new EmployeeIsOwnManagerException("Employee", "Employee cannot be his own " +
                        "manager");
            }
            employee.setManager(employeeRepository.findById(managerId).orElseThrow(() -> {
                log.error("Manager not found at SetManager()");
                return new ManagerNotFoundException(managerId);
            }));
        }
    }

    private void setProjects(Employee employee, List<UUID> projectIds) {

        if (employee.getProjects() != null) {
            employee.getProjects().forEach(project -> {
                project.getEmployees().remove(employee);
            });
        }

        if (projectIds == null) {
            throw new ProjectIdIsNullException("projectIds", "ProjectIds list is null");
        }
        List<Project> projectsList = new ArrayList<>();

        if (!projectIds.isEmpty()) {
            projectIds.forEach((uuid) -> {
                Project project = projectRepository.findById(uuid).orElseThrow(() -> {
                    log.error(
                            "Project not exist error at SetProject()");
                    return new ProjectNotFoundException(uuid);
                });

                project.getEmployees().add(employee);

                projectsList.add(project);
            });

        }

        employee.getProjects().clear();
        employee.getProjects().addAll(projectsList);
    }

    private void setSkills(Employee employee, List<SkillEditCreateDTO> newSkillsDTO) {
        List<Skill> existingSkills = employee.getSkills();
        List<Skill> newSkillsList =
                newSkillsDTO.stream().map(skillMapper::skillEditCreateDtoToSkill).toList();

        Map<UUID, Skill> existingSkillsMap = existingSkills.stream().filter(
                        skill -> skill.getId() != null)
                .collect(Collectors.toMap(Skill::getId, skill -> skill));

        Map<UUID, Skill> newSkillsMap = newSkillsList.stream()
                .filter(skill -> skill.getId() != null)
                .collect(Collectors.toMap(Skill::getId, skill -> skill));

        existingSkills.removeIf(skill -> !newSkillsMap.containsKey(skill.getId()));

        for (Skill skill : newSkillsList) {

            Skill existingSkill = existingSkillsMap.get(skill.getId());

            if (existingSkill != null) {

                existingSkill.setName(skill.getName());
                existingSkill.setProficiency(skill.getProficiency());
            } else {
                skill.setEmployee(employee);
                existingSkills.add(skill);
            }
        }
    }
}

