package com.bootcamp.employees_api.controllers;

import com.bootcamp.employees_api.DTO.EmployeeCreateDTO;
import com.bootcamp.employees_api.DTO.EmployeeDTO;
import com.bootcamp.employees_api.DTO.EmployeeEditDTO;
import com.bootcamp.employees_api.mappers.EmployeeMapper;
import com.bootcamp.employees_api.services.interfaces.IEmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/employees")
@Validated
public class EmployeeController {

    private final IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService, EmployeeMapper employeeMapper) {
        _employeeService = employeeService;
    }

    @GetMapping("{employeeId}")
    public EmployeeDTO findEmployeeById(@Valid @PathVariable UUID employeeId) {
        return _employeeService.findEmployeeById(employeeId);
    }

    @GetMapping()
    public List<EmployeeDTO> findEmployeesByName(@Valid @RequestParam(required = false) String name) {
        return _employeeService.findAllEmployees(name);
    }

    @PutMapping("/employees/{employeeId}")
    public void editEmployeeById(@PathVariable UUID employeeId, @Valid
    @RequestBody EmployeeEditDTO employee) {
        _employeeService.updateEmployee(employee, employeeId);
    }

    @PostMapping()
    public ResponseEntity<UUID> addEmployee(@Valid @RequestBody EmployeeCreateDTO employeeCreateDTO) {
        UUID createdEmployeeId = _employeeService.addEmployee(employeeCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployeeId);
    }

    @DeleteMapping("{employeeId}")
    public void deleteEmployeeById(@Valid @PathVariable UUID employeeId) {
        _employeeService.deleteEmployee(employeeId);
    }

}
