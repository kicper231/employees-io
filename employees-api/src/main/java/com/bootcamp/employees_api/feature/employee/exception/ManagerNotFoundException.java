package com.bootcamp.employees_api.feature.employee.exception;

import com.bootcamp.employees_api.exception.EntityNotFoundException;

import java.util.UUID;

public class ManagerNotFoundException extends EntityNotFoundException {
    private static final String ENTITY_TYPE = "manager";

    public ManagerNotFoundException(UUID entityId) {
        super(entityId, ENTITY_TYPE);
    }
}