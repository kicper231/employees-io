package com.bootcamp.employees_api.feature.employee.exceptions;

import com.bootcamp.employees_api.exception.EntityNotFoundException;

import java.util.UUID;

public class EmployeeNotFoundException extends EntityNotFoundException {
    private static final String ENTITY_TYPE = "employee";

    public EmployeeNotFoundException(UUID entityId) {
        super(entityId, ENTITY_TYPE);
    }
}
