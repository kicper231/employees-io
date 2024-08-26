package com.bootcamp.employees_api.feature.employee.mappers;

import com.bootcamp.employees_api.feature.employee.dto.SkillCreateDTO;
import com.bootcamp.employees_api.feature.employee.dto.SkillDTO;
import com.bootcamp.employees_api.feature.employee.models.Skill;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    Skill skillCreateDtoToSkill(SkillCreateDTO skillCreateDTO);

    SkillDTO skillToSkillDTO(Skill skill);

    SkillCreateDTO skillToSkillCreateDTO(Skill skill);
}
