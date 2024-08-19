package com.bootcamp.employees_api.services.interfaces;

import com.bootcamp.employees_api.models.Employee;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IEmployeeService {

    public List<Employee> findAllEmployees(String name);

    public Optional<Employee> findEmployeeById(UUID id);

    public UUID addEmployee(Employee employee);

    public void deleteEmployee(UUID id);

    public void updateEmployee(Employee employee);
}
