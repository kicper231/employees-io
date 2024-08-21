package com.bootcamp.employees_api.DTO;

import java.util.UUID;

public record SkillDTO(UUID id, String name, String proficiency) {
}