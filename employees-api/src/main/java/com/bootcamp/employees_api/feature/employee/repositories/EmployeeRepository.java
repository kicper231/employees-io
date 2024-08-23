package com.bootcamp.employees_api.feature.employee.repositories;

import com.bootcamp.employees_api.feature.employee.models.Employee;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    List<Employee> findAllByNameContains(String pattern);

    @EntityGraph(value = "employee-projects-skills-graphItem")
    Optional<Employee> findById(UUID id);
}
