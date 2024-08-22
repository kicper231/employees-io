package com.bootcamp.employees_api.feature.employee.services.interfaces;

import com.bootcamp.employees_api.feature.employee.dto.EmployeeCreateDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeEditDTO;

import java.util.List;
import java.util.UUID;

public interface IEmployeeService {

    List<EmployeeDTO> findAllEmployees(String name);

    EmployeeDTO findEmployeeById(UUID id);

    UUID addEmployee(EmployeeCreateDTO employee);

    void deleteEmployee(UUID id);

    void updateEmployee(EmployeeEditDTO employee, UUID employeeId);
}
