package com.bootcamp.employees_api.DTO;

import com.bootcamp.employees_api.models.ProficiencyLevelsEnums;
import com.bootcamp.employees_api.validators.adnotations.ValueOfEnum;
import jakarta.validation.constraints.NotNull;

public record SkillCreateDTO(@NotNull String name,
                             @ValueOfEnum(enumClass = ProficiencyLevelsEnums.class) String proficiency) {
}