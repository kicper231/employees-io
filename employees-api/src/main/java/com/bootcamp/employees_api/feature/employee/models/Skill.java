package com.bootcamp.employees_api.feature.employee.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Basic
    @Column
    @NotNull
    private String name;

    @Basic
    @Column
    @NotNull
    private ProficiencyLevelsEnums proficiency;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

}
