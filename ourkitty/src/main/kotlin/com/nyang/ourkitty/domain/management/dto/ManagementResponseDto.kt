package com.nyang.ourkitty.domain.management.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.common.dto.ImageResponseDto
import com.nyang.ourkitty.domain.client.dto.ClientResponseDto
import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import java.time.LocalDateTime

data class ManagementResponseDto(
    val managementId: Long,
    val dish: DishResponseDto,
    val client: ClientResponseDto,
    val managementContent: String,
    val dishState: String,
    val managementImageList: List<ImageResponseDto> = emptyList(),
    val managementCommentList: List<ManagementCommentResponseDto> = emptyList(),
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,
) {

    constructor() : this(
        managementId = 1,
        dish = DishResponseDto(),
        client = ClientResponseDto(),
        managementContent = "고양이 귀여워",
        dishState = "0040001",
        isDeleted = false,
        createdDate = LocalDateTime.now(),
        updatedDate = LocalDateTime.now()
    )
}