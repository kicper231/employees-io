package com.bootcamp.employees_api.feature.projects.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record ProjectCreateDTO(
        @NotNull String name, @NotNull String description,
        @NotNull List<UUID> employeeIds) {
}