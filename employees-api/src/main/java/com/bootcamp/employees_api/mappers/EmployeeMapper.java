package com.bootcamp.employees_api.mappers;

import com.bootcamp.employees_api.DTO.EmployeeCreateDTO;
import com.bootcamp.employees_api.DTO.EmployeeDTO;
import com.bootcamp.employees_api.models.Employee;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {SkillMapper.class, ProjectMapper.class})
public interface EmployeeMapper {

    Employee employeeCreateDtoToEmployee(EmployeeCreateDTO employeeCreateDTO);

    EmployeeDTO employeeToDtoEmployee(Employee employee);

}
