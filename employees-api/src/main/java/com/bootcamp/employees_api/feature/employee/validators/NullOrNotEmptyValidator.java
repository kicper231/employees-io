package com.bootcamp.employees_api.feature.employee.validators;

import com.bootcamp.employees_api.feature.employee.validators.adnotations.NullOrNotEmpty;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

public class NullOrNotEmptyValidator implements ConstraintValidator<NullOrNotEmpty, List<?>> {

    @Override
    public void initialize(NullOrNotEmpty constraintAnnotation) {
    }

    @Override
    public boolean isValid(List<?> value, ConstraintValidatorContext context) {
        return value == null || !value.isEmpty();
    }
}