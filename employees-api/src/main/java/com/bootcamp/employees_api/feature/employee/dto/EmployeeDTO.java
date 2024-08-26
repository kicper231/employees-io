package com.bootcamp.employees_api.feature.employee.dto;

import com.bootcamp.employees_api.feature.projects.dto.ProjectSummaryDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record EmployeeDTO(@NotBlank UUID id, @NotBlank String name,
                          @NotBlank String surname,
                          @NotNull @DateTimeFormat Date hireDate,
                          @NotNull List<SkillDTO> skills,
                          List<ProjectSummaryDTO> projects,
                          ManagerDTO manager) {

}