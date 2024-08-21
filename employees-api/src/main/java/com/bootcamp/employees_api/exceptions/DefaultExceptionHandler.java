package com.bootcamp.employees_api.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class DefaultExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(ResourceNotFoundException exception,
                                                         HttpServletRequest request) {
        return buildErrorResponse(request, HttpStatus.NOT_FOUND, exception.getMessage());
    }

    @ExceptionHandler(RequestValidationException.class)
    public ResponseEntity<ErrorResponse> handleException(RequestValidationException exception, HttpServletRequest request) {
        return buildErrorResponse(request, HttpStatus.BAD_REQUEST, exception.getMessage());

    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleException(MethodArgumentTypeMismatchException exception,
                                                         HttpServletRequest request) {
        return buildErrorResponse(request, HttpStatus.BAD_REQUEST, exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleException(MethodArgumentNotValidException exception,
                                                         HttpServletRequest request) {

        Map<String, String> errors = new HashMap<>();
        for (FieldError error : exception.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        String errorMessage = "Validation failed for fields: " + errors;
        return buildErrorResponse(request, HttpStatus.BAD_REQUEST, errorMessage);

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
