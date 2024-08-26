package com.bootcamp.employees_api.feature.projects;

import com.bootcamp.employees_api.feature.projects.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findAllByNameContains(String pattern);
}