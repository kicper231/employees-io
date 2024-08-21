package com.bootcamp.employees_api.services;

import com.bootcamp.employees_api.DTO.EmployeeCreateDTO;
import com.bootcamp.employees_api.DTO.EmployeeDTO;
import com.bootcamp.employees_api.DTO.EmployeeEditDTO;
import com.bootcamp.employees_api.exceptions.ResourceNotFoundException;
import com.bootcamp.employees_api.mappers.EmployeeMapper;
import com.bootcamp.employees_api.mappers.ProjectMapper;
import com.bootcamp.employees_api.mappers.SkillMapper;
import com.bootcamp.employees_api.models.Employee;
import com.bootcamp.employees_api.repositories.EmployeeRepository;
import com.bootcamp.employees_api.services.interfaces.IEmployeeService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
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
//  @Transactional(readOnly = true)
    public List<EmployeeDTO> findAllEmployees(String name) {
        List<Employee> allEmployees;

        allEmployees = name == null || name.isBlank() ?
                employeeRepository.findAll() :
                employeeRepository.findAllByNameContains(
                        name);

        return allEmployees.stream().map(employeeMapper::employeeToDtoEmployee).toList();
    }

    @Override
    @Transactional
    public EmployeeDTO findEmployeeById(UUID employeeId) {

        Optional<EmployeeDTO> result = employeeRepository.findById(employeeId).map(
                employeeMapper::employeeToDtoEmployee);

        return result.orElseThrow(() -> new ResourceNotFoundException(
                "User with the given id:" + employeeId + "doesn't exist"));
    }

    @Override
    @Transactional
    public UUID addEmployee(EmployeeCreateDTO employeeCreateDTO) {
        Employee employee = employeeMapper.employeeCreateDtoToEmployee(employeeCreateDTO);
        if (employeeCreateDTO.managerId() != null) {
            employee.setManager(
                    employeeRepository.findById(employeeCreateDTO.managerId()).orElseThrow(
                            () -> new ResourceNotFoundException(
                                    "Manager with the given id: " + employeeCreateDTO.managerId()
                                            + " doesn't exist")
                    )
            );
        }

        employee.getSkills().forEach(skill -> skill.setEmployee(employee));
        employee.getProjects().forEach(project -> project.setEmployee(employee));

        return employeeRepository.save(employee).getId();
    }

    @Override
    @Transactional
    public void deleteEmployee(UUID employeeId) {

        if (employeeExist(employeeId)) {
            employeeRepository.deleteById(employeeId);
            return;
        }

        throw new ResourceNotFoundException(
                "User with the given id:" + employeeId + "doesn't exist");
    }

    @Override
    @Transactional
    public void updateEmployee(EmployeeEditDTO employeeEditDTO, UUID employeeId) {

        Employee employeeToEdit = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User with the given id:" + employeeId + "doesn't exist"));

        employeeToEdit.setName(
                Objects.requireNonNullElse(employeeEditDTO.name(), employeeToEdit.getName()));

        employeeToEdit.setSurname(
                Objects.requireNonNullElse(employeeEditDTO.surname(), employeeToEdit.getSurname()));

        employeeToEdit.setHireDate(Objects.requireNonNullElse(employeeEditDTO.hireDate(),
                                                              employeeToEdit.getHireDate()
        ));

        if (employeeEditDTO.skills() != null) {
            employeeToEdit.getSkills().clear();
            employeeToEdit.getSkills().addAll(employeeEditDTO.skills().stream()
                                                      .map(skillMapper::skillCreateDtoToSkill).toList());
        }

        if (employeeEditDTO.projects() != null) {
            employeeToEdit.getProjects().clear();
            employeeToEdit.getProjects().addAll(employeeEditDTO.projects().stream()
                                                        .map(projectMapper::projectCreateDtoToProject).toList());
        }

        if (employeeEditDTO.managerId() != null) {
            employeeToEdit.setManager(employeeRepository.findById(employeeEditDTO.managerId())
                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                      "Manager with the given id doesn't exist")));
        }

        employeeToEdit.getSkills().forEach(skill -> skill.setEmployee(employeeToEdit));
        employeeToEdit.getProjects().forEach(project -> project.setEmployee(employeeToEdit));

        employeeRepository.save(employeeToEdit);

    }

    public boolean employeeExist(UUID employeeId) {
        return employeeRepository.existsById(employeeId);
    }

}
