package com.bootcamp.employees_api.models;

import jakarta.persistence.*;
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
    private String name;

    @Basic
    @Column
    private ProficiencyLevelsEnums proficiency;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

}
