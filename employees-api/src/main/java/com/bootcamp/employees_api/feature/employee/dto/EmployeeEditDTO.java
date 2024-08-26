package com.bootcamp.employees_api.feature.employee.dto;

import com.bootcamp.employees_api.feature.employee.validators.adnotations.NullOrNotBlank;
import com.bootcamp.employees_api.feature.employee.validators.adnotations.NullOrNotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record EmployeeEditDTO(@NullOrNotBlank String name,
                              @NullOrNotBlank String surname,
                              @DateTimeFormat Date hireDate,
                              @NullOrNotEmpty List<SkillEditCreateDTO> skills,
                              List<UUID> projectsIds,
                              UUID managerId) {}