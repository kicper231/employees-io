package com.bootcamp.employees_api.exception;

import org.springframework.http.HttpStatus;

public abstract class BadRequestException extends ApplicationException {

    private static final String MESSAGE_TEMPLATE = "Invalid request for entity of type %s. Details: %s";

    public BadRequestException(String entityType, String details) {
        super(MESSAGE_TEMPLATE.formatted(entityType, details));
    }

    @Override
    HttpStatus getResponseStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}