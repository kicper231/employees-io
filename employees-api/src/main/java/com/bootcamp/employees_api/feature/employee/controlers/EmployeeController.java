package com.bootcamp.employees_api.feature.employee.controlers;

import com.bootcamp.employees_api.feature.employee.dto.EmployeeCreateDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeEditDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeSummaryDTO;
import com.bootcamp.employees_api.feature.employee.mappers.EmployeeMapper;
import com.bootcamp.employees_api.feature.employee.services.IEmployeeService;
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
@CrossOrigin
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
    public List<EmployeeSummaryDTO> findEmployeesByName(@RequestParam(required = false) String name) {
        return _employeeService.findAllEmployees(name);
    }

    @PutMapping("/{employeeId}")
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
    public void deleteEmployeeById(@PathVariable UUID employeeId) {
        _employeeService.deleteEmployee(employeeId);
    }

}
