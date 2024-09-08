package com.bootcamp.employees_api.feature.employee.mappers;

import com.bootcamp.employees_api.feature.employee.dto.*;
import com.bootcamp.employees_api.feature.employee.models.Employee;
import com.bootcamp.employees_api.feature.employee.models.ProficiencyLevelsEnums;
import com.bootcamp.employees_api.feature.employee.models.Skill;
import com.bootcamp.employees_api.feature.projects.dto.ProjectSummaryDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class MyEmployeeMapper {

 public Employee employeeCreateDtoToEmployee(EmployeeCreateDTO employeeCreateDTO) {
  Employee employee = new Employee();

  employee.setName(employeeCreateDTO.name());
  employee.setSurname(employeeCreateDTO.surname());
  employee.setHireDate(employeeCreateDTO.hireDate());

  List<Skill> skills = employeeCreateDTO.skills().stream()
          .map(this::skillEditCreateDTOToSkill)
          .collect(Collectors.toList());
  employee.setSkills(skills);


  return employee;
 }

 private Skill skillEditCreateDTOToSkill(SkillEditCreateDTO skillDTO) {
  Skill skill = new Skill();
  skill.setId(skillDTO.id());
  skill.setName(skillDTO.name());
  skill.setProficiency( Enum.valueOf(ProficiencyLevelsEnums.class, skillDTO.proficiency() ) );
  return skill;
 }

 private SkillDTO skillToDTO(Skill skill) {
  return new SkillDTO(skill.getId(), skill.getName(), skill.getProficiency().name());
 }


 public EmployeeDTO employeeToEmployeeDto(Employee employee) {
  List<SkillDTO> skillDTOs = employee.getSkills().stream()
          .map(this::skillToDTO)
          .collect(Collectors.toList());

  List<ProjectSummaryDTO> projectSummaryDTOs = employee.getProjects().stream()
          .map(project -> new ProjectSummaryDTO(project.getId(), project.getName(), project.getDescription()))
          .collect(Collectors.toList());

  ManagerDTO managerDTO = employee.getManager() != null
          ? employeeToManagerDTO(employee)
          : null;

  return new EmployeeDTO(
          employee.getId(),
          employee.getName(),
          employee.getSurname(),
          employee.getHireDate(),
          skillDTOs,
          projectSummaryDTOs,
          managerDTO
  );
 }

 public EmployeeSummaryDTO employeeToEmployeeSummaryDTO(Employee employee) {
  return new EmployeeSummaryDTO(
          employee.getId(),
          employee.getName(),
          employee.getSurname()
  );
 }


 public ManagerDTO employeeToManagerDTO(Employee employee) {
  if ( employee == null ) {
   return null;
  }

  UUID id = null;
  String name = null;
  String surname = null;

  id = employee.getId();
  name = employee.getName();
  surname = employee.getSurname();

  return  new ManagerDTO( id, name, surname );
 }
}
