package com.bootcamp.employees_api.feature.projects.models;

import com.bootcamp.employees_api.feature.employee.models.Employee;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Basic
    @Column
    private String name;

    @Basic
    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

}
