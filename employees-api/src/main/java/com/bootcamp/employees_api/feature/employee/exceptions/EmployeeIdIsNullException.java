package com.bootcamp.employees_api.feature.employee.exceptions;

import com.bootcamp.employees_api.exception.BadRequestException;

public class EmployeeIdIsNullException extends BadRequestException {

    public EmployeeIdIsNullException(String entityType, String details) {
        super(entityType, details);
    }
}
