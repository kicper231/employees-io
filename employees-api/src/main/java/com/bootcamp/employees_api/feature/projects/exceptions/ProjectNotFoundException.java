package com.bootcamp.employees_api.feature.projects.exceptions;

import com.bootcamp.employees_api.exception.EntityNotFoundException;

import java.util.UUID;

public class ProjectNotFoundException extends EntityNotFoundException {
    private static final String ENTITY_TYPE = "Project";

    public ProjectNotFoundException(UUID entityId) {
        super(entityId, ENTITY_TYPE);
    }
}
