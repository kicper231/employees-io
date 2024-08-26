package com.bootcamp.employees_api.feature.employee.exceptions;

import com.bootcamp.employees_api.exception.BadRequestException;

public class EmployeeIsOwnManagerException extends BadRequestException {

    public EmployeeIsOwnManagerException(String entityType, String details) {
        super(entityType, details);
    }
}
