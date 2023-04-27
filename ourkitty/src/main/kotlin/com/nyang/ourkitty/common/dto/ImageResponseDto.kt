package com.nyang.ourkitty.common.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.domain.management.dto.ManagementImageResponseDto
import com.nyang.ourkitty.entity.ImageEntity
import com.nyang.ourkitty.entity.ManagementImageEntity
import java.time.LocalDateTime

data class ImageResponseDto(
    val imageId: Long,
    val imagePath: String,
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,

    ) {
    

    constructor() : this(
        1,
        "./default.png",
        false,
        LocalDateTime.now(),
        LocalDateTime.now()
    )
}
