package com.bootcamp.employees_api.mappers;

import com.bootcamp.employees_api.DTO.SkillCreateDTO;
import com.bootcamp.employees_api.models.Skill;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    Skill skillCreateDtoToSkill(SkillCreateDTO skillCreateDTO);

}
