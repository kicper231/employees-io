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

//{
//        "name": "string",
//        "surname": "string",
//        "hireDate": "2024-08-27T00:00:00.000Z",
//        "skills": [
//        {
//        "id": "222692cd-c9bc-4d8f-8637-98a84c9ec783",
//        "name": "string",
//        "proficiency": "BEGINNER"
//        }
//        ],
//        "projectIds": [
//        "d45b6d6c-4eef-4eb5-a663-691945f755b2",
//        "7527af24-61fd-4be7-8bc3-0175c9d21134"
//        ],
//        "managerId": "dd6e32d5-1c68-41fe-9e43-7b9a6f0da05a"
//        }
//
//        {
//        "name": "string",
//        "surname": "string",
//        "hireDate": "2024-08-27T11:16:41.187Z",
//        "skills": [
//        {
//        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//        "name": "string",
//        "proficiency": "string"
//        }
//        ],
//        "projectsI": [
//        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//        ],
//        "managerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//        }