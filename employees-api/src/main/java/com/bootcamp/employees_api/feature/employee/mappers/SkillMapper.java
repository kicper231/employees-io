package com.bootcamp.employees_api.feature.employee.mappers;

import com.bootcamp.employees_api.feature.employee.dto.SkillEditCreateDTO;
import com.bootcamp.employees_api.feature.employee.models.Skill;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    Skill skillEditCreateDtoToSkill(SkillEditCreateDTO skillCreateDTO);

    // ProficiencyLevelsEnums stringToProficiencyLevelsEnums(String proficiency);

    // SkillCreateDTO skillToSkillCreateDTO(Skill skill);
}
