package com.bootcamp.employees_api.DTO;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record EmployeeDTO(UUID id, String name,
                          String surname,
                          Date hireDate,
                          List<SkillDTO> skills,
                          List<ProjectDTO> projects,
                          ManagerDTO manager) {

}