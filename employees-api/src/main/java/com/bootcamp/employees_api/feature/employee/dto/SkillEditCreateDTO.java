package com.bootcamp.employees_api.feature.employee.dto;

import com.bootcamp.employees_api.feature.employee.models.ProficiencyLevelsEnums;
import com.bootcamp.employees_api.feature.employee.validators.adnotations.ValueOfEnum;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SkillEditCreateDTO(
        UUID id,
        @NotNull String name,
        @ValueOfEnum(enumClass = ProficiencyLevelsEnums.class) String proficiency) {
}