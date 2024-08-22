package com.bootcamp.employees_api.feature.employee.dto;

import java.util.UUID;

public record ManagerDTO(UUID id, String name, String surname) {
}