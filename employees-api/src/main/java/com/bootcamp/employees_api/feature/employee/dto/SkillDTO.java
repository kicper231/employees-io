package com.bootcamp.employees_api.feature.employee.dto;

import com.bootcamp.employees_api.feature.employee.models.ProficiencyLevelsEnums;
import com.bootcamp.employees_api.feature.employee.validators.adnotations.ValueOfEnum;

import java.util.UUID;

public record SkillDTO(UUID id,
                       String name,
                       @ValueOfEnum(enumClass = ProficiencyLevelsEnums.class) String proficiency) {
}