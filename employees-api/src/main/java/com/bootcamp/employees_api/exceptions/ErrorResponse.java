package com.bootcamp.employees_api.exceptions;

import java.time.LocalDateTime;

public record ErrorResponse(
        String path,
        String message,
        int statusCode,
        LocalDateTime localDateTime
) {
}
