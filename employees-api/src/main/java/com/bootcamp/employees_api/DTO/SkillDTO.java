package com.bootcamp.employees_api.DTO;

import com.bootcamp.employees_api.models.ProficiencyLevelsEnums;
import com.bootcamp.employees_api.validators.adnotations.ValueOfEnum;

import java.util.UUID;

public record SkillDTO(UUID id,
                       String name,
                       @ValueOfEnum(enumClass = ProficiencyLevelsEnums.class) String proficiency) {
}