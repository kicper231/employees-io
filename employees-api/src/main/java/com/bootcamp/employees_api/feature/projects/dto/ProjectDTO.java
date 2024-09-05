package com.bootcamp.employees_api.feature.projects.dto;

import com.bootcamp.employees_api.feature.employee.dto.EmployeeSummaryDTO;

import java.util.List;
import java.util.UUID;

public record ProjectDTO(UUID id, String name, String description,
                         List<EmployeeSummaryDTO> employees) {
}
