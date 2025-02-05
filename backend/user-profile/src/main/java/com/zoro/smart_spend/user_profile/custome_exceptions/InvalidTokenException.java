package com.zoro.smart_spend.user_profile.custome_exceptions;

import org.springframework.http.HttpStatus;

public class InvalidTokenException extends CustomException {
    public InvalidTokenException() {
        super("Invalid Token...", HttpStatus.FORBIDDEN);
    }
}
