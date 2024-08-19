package com.bootcamp.employees_api.models;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    private String name;
    private String surname;
    private Date hireDate;

    @OneToMany(mappedBy = "employee")
    private List<Skill> skillsList;
    
    @OneToMany(mappedBy = "employee")
    private List<Project> projects;


}
