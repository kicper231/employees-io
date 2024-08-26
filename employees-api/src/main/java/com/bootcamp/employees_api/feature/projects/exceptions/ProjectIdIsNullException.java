package com.bootcamp.employees_api.feature.projects.exceptions;

import com.bootcamp.employees_api.exception.BadRequestException;

public class ProjectIdIsNullException extends BadRequestException {

    public ProjectIdIsNullException(String entityType, String details) {
        super(entityType, details);
    }
}
