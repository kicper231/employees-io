package com.bootcamp.employees_api.feature.projects.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record ProjectCreateDTO(
        @NotNull String name, @NotNull String description,
        @NotNull List<UUID> employeeIds) {
}