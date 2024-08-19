package com.bootcamp.employees_api.controllers;

import com.bootcamp.employees_api.models.Employee;

import com.bootcamp.employees_api.services.interfaces.IEmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/employees")
public class EmployeeController {

  private final IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService) {

        _employeeService = employeeService;
    }


    @GetMapping("{employeeId}")
    private Optional<Employee> FindEmployeeById(@PathVariable UUID employeeId)
    {
        return _employeeService.findEmployeeById(employeeId);
    }

    @GetMapping()
    private List<Employee> getEmployeesByName(@RequestParam(required = false) String name)
    {
    return _employeeService.findAllEmployees(name);
    }

    @PutMapping()
    private void editEmployeeById(@RequestBody Employee employee)
    {
        _employeeService.updateEmployee(employee);
    }

    @PostMapping()
    private ResponseEntity<UUID> addEmployeeById(@RequestBody Employee employee)
    {
        UUID createdEmployeeId = _employeeService.addEmployee(employee);
        return  ResponseEntity.status(HttpStatus.CREATED).body(createdEmployeeId);
    }

    @DeleteMapping("{employeeId}")
    private void deleteEmployeeById(@PathVariable UUID employeeId)
    {
       _employeeService.deleteEmployee(employeeId);

    }


}
