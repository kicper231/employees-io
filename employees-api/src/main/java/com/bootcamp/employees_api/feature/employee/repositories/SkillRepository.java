package com.bootcamp.employees_api.feature.employee.repositories;

import com.bootcamp.employees_api.feature.employee.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SkillRepository extends JpaRepository<Skill, UUID> {

}
