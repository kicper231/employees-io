package com.bootcamp.employees_api.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record EmployeeCreateDTO(@NotBlank String name,
                                @NotBlank String surname,
                                @NotNull Date hireDate,
                                @NotEmpty @Size(min = 1) List<SkillCreateDTO> skills,
                                @NotEmpty @Size(min = 1) List<ProjectCreateDTO> projects,
                                UUID managerId) {

}