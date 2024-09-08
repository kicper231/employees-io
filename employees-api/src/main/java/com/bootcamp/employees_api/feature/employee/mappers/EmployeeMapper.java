package com.bootcamp.employees_api.feature.employee.mappers;

import com.bootcamp.employees_api.feature.employee.dto.EmployeeCreateDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeSummaryDTO;
import com.bootcamp.employees_api.feature.employee.models.Employee;
import com.bootcamp.employees_api.feature.projects.mappers.ProjectMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {SkillMapper.class, ProjectMapper.class})
public interface EmployeeMapper {

    Employee employeeCreateDtoToEmployee(EmployeeCreateDTO employeeCreateDTO);

    EmployeeDTO employeeToEmployeeDto(Employee employee);

    EmployeeSummaryDTO employeeToEmployeeSummaryDTO(Employee employee);

}
