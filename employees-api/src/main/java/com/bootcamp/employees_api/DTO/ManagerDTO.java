package com.bootcamp.employees_api.DTO;

import java.util.UUID;

public record ManagerDTO(UUID id, String name, String surname) {
}