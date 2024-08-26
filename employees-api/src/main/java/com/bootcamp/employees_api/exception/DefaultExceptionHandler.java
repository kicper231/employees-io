package com.bootcamp.employees_api.exception;

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

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> handleException(MethodArgumentTypeMismatchException exception,
                                                    HttpServletRequest request) {
        return buildApiError(request, HttpStatus.BAD_REQUEST, exception.getMessage());
    }

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ApiError> handleException(ApplicationException exception,
                                                    HttpServletRequest request) {
        return buildApiError(request, exception.getResponseStatus(), exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleException(MethodArgumentNotValidException exception,
                                                    HttpServletRequest request) {

        Map<String, String> errors = new HashMap<>();
        for (FieldError error : exception.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        String errorMessage = "Validation failed for fields: " + errors;
        return buildApiError(request, HttpStatus.BAD_REQUEST, errorMessage);

    }

    private ResponseEntity<ApiError> buildApiError(HttpServletRequest request, HttpStatus status,
                                                   String message) {
        ApiError responseError = new ApiError(
                request.getRequestURI(),
                message,
                status.value(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(responseError, status);
    }

}
