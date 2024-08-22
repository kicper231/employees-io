package com.bootcamp.employees_api.exception;

import org.springframework.http.HttpStatus;

import java.util.UUID;

public abstract class EntityNotFoundException extends ApplicationException {

    private static final String MESSAGE_TEMPLATE = "Cannot find entity of type %s with id: %s";

    public EntityNotFoundException(UUID entityId, String entityType) {
        super(MESSAGE_TEMPLATE.formatted(entityType, entityId));
    }

    @Override
    HttpStatus getResponseStatus() {
        return HttpStatus.NOT_FOUND;
    }

}
