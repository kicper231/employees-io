package com.bootcamp.employees_api.feature.employee.models;

import com.bootcamp.employees_api.feature.projects.models.Project;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@NamedEntityGraph(name = "employee-projects-skills-graphItem",
        attributeNodes =
                {
                        @NamedAttributeNode("projects"),
                        @NamedAttributeNode("skills")
                }
)
@Table(name = "employees")

public class Employee {
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
    private String surname;

    @Basic
    @Column
    @NotNull
    private Date hireDate;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch =
            FetchType.LAZY)
    @Size(min = 1)
    private List<Skill> skills;

    @ManyToMany(mappedBy = "employees", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Project> projects;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Employee manager;

}
