package com.bootcamp.employees_api.feature.projects.dto;

import java.util.UUID;

public record ProjectDTO(UUID id, String name, String description) {
}