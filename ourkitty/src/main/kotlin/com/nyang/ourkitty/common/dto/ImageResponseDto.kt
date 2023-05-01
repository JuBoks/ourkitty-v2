package com.nyang.ourkitty.common.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDateTime

data class ImageResponseDto(
    val imageId: Long,
    val imagePath: String,
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,
)