package com.bootcamp.employees_api.feature.employee.mappers;

import com.bootcamp.employees_api.feature.employee.dto.EmployeeCreateDTO;
import com.bootcamp.employees_api.feature.employee.dto.EmployeeDTO;
import com.bootcamp.employees_api.feature.employee.models.Employee;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {SkillMapper.class, ProjectMapper.class})
public interface EmployeeMapper {

    Employee employeeCreateDtoToEmployee(EmployeeCreateDTO employeeCreateDTO);

    EmployeeDTO employeeToDtoEmployee(Employee employee);

}
