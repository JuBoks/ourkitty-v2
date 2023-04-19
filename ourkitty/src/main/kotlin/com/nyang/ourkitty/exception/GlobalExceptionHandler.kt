package com.nyang.ourkitty.exception

import org.hibernate.exception.ConstraintViolationException
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    /**
     * hibernate 관련 Exception
     */
    @ExceptionHandler(value = [ConstraintViolationException::class, DataIntegrityViolationException::class])
    protected fun handleDataException(): ResponseEntity<ErrorResponse> {
        return ErrorResponse.toResponseEntity(ErrorCode.DUPLICATE_RESOURCE)
    }

    @ExceptionHandler(CustomException::class)
    protected fun handleCustomException(ex: CustomException): ResponseEntity<ErrorResponse> {
        return ErrorResponse.toResponseEntity(ex.errorCode)
    }


}