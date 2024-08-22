package com.bootcamp.employees_api.exception;

import org.springframework.http.HttpStatus;

public abstract class ApplicationException extends RuntimeException {
    public ApplicationException(String message) {super(message);}

    abstract HttpStatus getResponseStatus();
}
