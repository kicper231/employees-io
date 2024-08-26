package com.bootcamp.employees_api.feature.employee.dto;

import java.util.UUID;

public record EmployeeSummaryDTO(UUID id, String name, String surname) {
}
