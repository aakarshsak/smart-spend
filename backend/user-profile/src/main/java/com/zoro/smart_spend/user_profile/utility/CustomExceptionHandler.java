package com.zoro.smart_spend.user_profile.utility;

import com.zoro.smart_spend.user_profile.custome_exceptions.CustomException;
import com.zoro.smart_spend.user_profile.models.ExceptionRespone;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@ControllerAdvice
public class CustomExceptionHandler {

//    @ExceptionHandler
//    public ResponseEntity<ExceptionRespone> handleRuntimeException(RuntimeException exception) {
//        ExceptionRespone exceptionRespone = ExceptionRespone.builder()
//                .status(500)
//                .timestamp(System.currentTimeMillis())
//                .message(exception.getMessage())
//                .build();
//        return new ResponseEntity<>(exceptionRespone, HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler
    public ResponseEntity<ExceptionRespone> handleUserNotFound(UsernameNotFoundException exception) {
        ExceptionRespone exceptionRespone = ExceptionRespone.builder()
                .status(500)
                .timestamp(System.currentTimeMillis())
                .message(exception.getMessage())
                .build();
        return new ResponseEntity<>(exceptionRespone, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionRespone> handleCustomException(CustomException exception) {
        ExceptionRespone exceptionRespone = ExceptionRespone.builder()
                .status(exception.getStatus().value())
                .timestamp(System.currentTimeMillis())
                .message(exception.getMessage())
                .build();
        return new ResponseEntity<>(exceptionRespone, exception.getStatus());
    }
}
