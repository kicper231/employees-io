package com.bootcamp.employees_api.feature.employee.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record EmployeeEditDTO(@NotBlank String name,
                              @NotBlank String surname,
                              @NotNull @DateTimeFormat Date hireDate,
                              @NotEmpty List<SkillCreateDTO> skills,
                              @NotEmpty List<ProjectCreateDTO> projects,
                              UUID managerId) {}