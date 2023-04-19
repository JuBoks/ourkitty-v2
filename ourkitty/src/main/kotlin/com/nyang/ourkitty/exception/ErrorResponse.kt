package com.nyang.ourkitty.exception

import com.fasterxml.jackson.annotation.JsonFormat
import org.springframework.http.ResponseEntity
import java.time.LocalDateTime

class ErrorResponse(
    val code: Int,
    val name: String,
    val message: String,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val timestamp: LocalDateTime = LocalDateTime.now()
) {
    constructor(errorCode: ErrorCode) : this(errorCode.status.value(), errorCode.status.name, errorCode.message)

    companion object {
        fun toResponseEntity(errorCode: ErrorCode): ResponseEntity<ErrorResponse> {
            return ResponseEntity
                .status(errorCode.status)
                .body(ErrorResponse(errorCode))
        }
    }
}