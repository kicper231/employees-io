package com.bootcamp.employees_api.feature.employee.dto;

import java.util.UUID;

public record ProjectDTO(UUID id, String name, String description) {
}