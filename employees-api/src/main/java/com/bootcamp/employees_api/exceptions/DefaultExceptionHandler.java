package com.bootcamp.employees_api.exceptions;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;

@ControllerAdvice
public class DefaultExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(ResourceNotFoundException exception,
                                                         HttpServletRequest request) {
        return buildErrorResponse(request, HttpStatus.NOT_FOUND, exception.getMessage());
    }

    @ExceptionHandler({RequestValidationException.class, MethodArgumentTypeMismatchException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ErrorResponse> handleException(RequestValidationException exception, HttpServletRequest request) {
        return buildErrorResponse(request, HttpStatus.BAD_REQUEST, exception.getMessage());

    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(HttpServletRequest request, HttpStatus status,
                                                             String message) {
        ErrorResponse responseError = new ErrorResponse(
                request.getRequestURI(),
                message,
                status.value(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(responseError, status);
    }


}
