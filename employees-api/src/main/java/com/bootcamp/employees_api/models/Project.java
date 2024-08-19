package com.bootcamp.employees_api.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
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
