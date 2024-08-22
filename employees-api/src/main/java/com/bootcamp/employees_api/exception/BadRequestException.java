package com.bootcamp.employees_api.exception;

import org.springframework.http.HttpStatus;

import java.util.UUID;

public abstract class BadRequestException extends ApplicationException {

    private static final String MESSAGE_TEMPLATE = "Invalid request for entity of type %s with id: %s. Details: %s";

    public BadRequestException(UUID entityId, String entityType, String details) {
        super(MESSAGE_TEMPLATE.formatted(entityType, entityId, details));
    }

    @Override
    HttpStatus getResponseStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}