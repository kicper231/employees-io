package com.bootcamp.employees_api.DTO;

import java.util.UUID;

public record ProjectDTO(UUID id, String name, String description) {
}