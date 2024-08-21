package com.bootcamp.employees_api.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record EmployeeEditDTO(@NotBlank String name,
                              @NotBlank String surname,
                              @NotBlank @DateTimeFormat Date hireDate,
                              @NotEmpty List<SkillCreateDTO> skills,
                              List<ProjectCreateDTO> projects,
                              UUID managerId) {}