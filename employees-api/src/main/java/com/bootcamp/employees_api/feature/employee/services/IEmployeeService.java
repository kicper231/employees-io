package com.bootcamp.employees_api.feature.employee.services;

import com.bootcamp.employees_api.feature.employee.dto.EmployeeCreateDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeEditDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeSummaryDTO;

import java.util.List;
import java.util.UUID;

public interface IEmployeeService {

    List<EmployeeSummaryDTO> findAllEmployees(String name);

    EmployeeDTO findEmployeeById(UUID id);

    UUID addEmployee(EmployeeCreateDTO employee);

    void deleteEmployee(UUID id);

    void updateEmployee(EmployeeEditDTO employee, UUID employeeId);
}
