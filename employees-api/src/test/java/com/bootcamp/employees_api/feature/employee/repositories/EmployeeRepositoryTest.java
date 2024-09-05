package com.bootcamp.employees_api.feature.employee.repositories;

import com.bootcamp.employees_api.feature.employee.models.Employee;
import com.bootcamp.employees_api.feature.employee.models.ProficiencyLevelsEnums;
import com.bootcamp.employees_api.feature.employee.models.Skill;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository underTest;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void shouldFindEmployeeByNamePattern() {
        // arrange
        Employee john = new Employee();
        john.setName("John");
        john.setSurname("Gleboki");
        john.setHireDate(new Date());
        Skill javaSkill = new Skill();
        javaSkill.setName("Glaskanie kota");
        javaSkill.setProficiency(ProficiencyLevelsEnums.INTERMEDIATE);
        javaSkill.setEmployee(john);

        john.setSkills(new ArrayList<>(List.of(javaSkill)));

        underTest.save(john);

        // act
        List<Employee> foundEmployee = underTest.findAllByNameContains("John");

        // assert
        assertThat(foundEmployee.size()).isEqualTo(1);
        assertThat(foundEmployee.getFirst()).isEqualTo(john);
    }

}
