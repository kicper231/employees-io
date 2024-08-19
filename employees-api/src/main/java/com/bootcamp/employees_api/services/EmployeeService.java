package com.bootcamp.employees_api.services;

import com.bootcamp.employees_api.exceptions.RequestValidationException;
import com.bootcamp.employees_api.exceptions.ResourceNotFoundException;
import com.bootcamp.employees_api.models.Employee;
import com.bootcamp.employees_api.repositories.EmployeeRepository;
import com.bootcamp.employees_api.services.interfaces.IEmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class EmployeeService implements IEmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public List<Employee> findAllEmployees(String name) {

        return name == null || name.isBlank()
                ? employeeRepository.findAll()
                : employeeRepository.findAllByNameContains(name);
    }

    @Override
    public Optional<Employee> findEmployeeById(UUID employeeId) {

        if (employeeExist(employeeId)) {
            return employeeRepository.findById(employeeId);
        }

        throw new ResourceNotFoundException("User with the given id doesn't exist");
    }

    @Override
    public UUID addEmployee(Employee employee) {
        return employeeRepository.save(employee).getId();
    }

    @Override
    public void deleteEmployee(UUID employeeId) {

        if (employeeExist(employeeId)) {
            employeeRepository.deleteById(employeeId);
        }

        throw new ResourceNotFoundException("User with the given id doesn't exist");
    }

    @Override
    public void updateEmployee(Employee employee) {
        if (isUpdatedEmployeeDataValid(employee)) {
            employeeRepository.save(employee);
        }
        throw new RequestValidationException("Employees updated data is not valid");

    }

    public boolean employeeExist(UUID employeeId) {
        return employeeRepository.existsById(employeeId);
    }

    public boolean isUpdatedEmployeeDataValid(Employee employeeData) {
        return !employeeData.getName().isBlank();
    }


}
