package com.nyang.ourkitty.domain.auth.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDateTime

data class LoginErrorResponseDto(
    val clientDescription: String,
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val unBlockDate: LocalDateTime = LocalDateTime.now(),
) {
}