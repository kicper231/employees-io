package com.bootcamp.employees_api.feature.employee.services;

import com.bootcamp.employees_api.feature.employee.dto.EmployeeCreateDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeEditDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeSummaryDTO;
import com.bootcamp.employees_api.feature.employee.exceptions.EmployeeIdIsNullException;
import com.bootcamp.employees_api.feature.employee.exceptions.EmployeeNotFoundException;
import com.bootcamp.employees_api.feature.employee.exceptions.ManagerNotFoundException;
import com.bootcamp.employees_api.feature.employee.mappers.EmployeeMapper;
import com.bootcamp.employees_api.feature.employee.mappers.SkillMapper;
import com.bootcamp.employees_api.feature.employee.models.Employee;
import com.bootcamp.employees_api.feature.employee.repositories.EmployeeRepository;
import com.bootcamp.employees_api.feature.projects.ProjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class EmployeeService implements IEmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final SkillMapper skillMapper;
    private final ProjectMapper projectMapper;

    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper, SkillMapper skillMapper, ProjectMapper projectMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.skillMapper = skillMapper;
        this.projectMapper = projectMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeSummaryDTO> findAllEmployees(String name) {
        List<Employee> allEmployees;

        allEmployees = name == null || name.isBlank() ? employeeRepository.findAll() : employeeRepository.findAllByNameContains(
                name);

        return allEmployees.stream().map(employeeMapper::employeeToEmployeeSummaryDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDTO findEmployeeById(UUID employeeId) {

        Optional<EmployeeDTO> result = employeeRepository.findById(employeeId).map(
                employeeMapper::employeeToEmployeeDto);

        return result.orElseThrow(() -> {
            log.error("Employee not found at findEmployeeById()");
            return new EmployeeNotFoundException(employeeId);
        });
    }

    @Override
    @Transactional
    public UUID addEmployee(EmployeeCreateDTO employeeCreateDTO) {
        Employee employee = employeeMapper.employeeCreateDtoToEmployee(employeeCreateDTO);
        SetManager(employee, employeeCreateDTO.managerId());

        return employeeRepository.save(employee).getId();
    }

    private void SetManager(Employee employee, UUID uuid) {
        if (uuid != null) {
            employee.setManager(employeeRepository.findById(uuid).orElseThrow(() -> {
                log.error("Manager not found at SetManager()");
                return new ManagerNotFoundException(uuid);
            }));
        }

        employee.getSkills().forEach(skill -> skill.setEmployee(employee));
        employee.getProjects().forEach(project -> project.setEmployee(employee));
    }

    @Override
    @Transactional
    public void deleteEmployee(UUID employeeId) {

        if (employeeExist(employeeId)) {
            employeeRepository.deleteById(employeeId);
            return;
        }
        log.error("Employee not found at deleteEmployee()");
        throw new EmployeeNotFoundException(employeeId);
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
            employeeToEdit.getSkills().clear();
            employeeToEdit.getSkills().addAll(employeeEditDTO.skills().stream().map(
                    skillMapper::skillCreateDtoToSkill).toList());
        }

        if (employeeEditDTO.projects() != null) {
            employeeToEdit.getProjects().clear();
            employeeToEdit.getProjects().addAll(employeeEditDTO.projects().stream().map(
                    projectMapper::projectCreateDtoToProject).toList());
        }

        SetManager(employeeToEdit, employeeEditDTO.managerId());

        employeeRepository.save(employeeToEdit);

    }

    public boolean employeeExist(UUID employeeId) {
        return employeeRepository.existsById(employeeId);
    }

}