package com.nyang.ourkitty.domain.management.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.common.dto.ImageResponseDto
import com.nyang.ourkitty.domain.client.dto.ClientResponseDto
import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import com.nyang.ourkitty.entity.ManagementEntity
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

    companion object {
        fun of(management: ManagementEntity): ManagementResponseDto {
            return ManagementResponseDto(
                managementId = management.managementId!!,
                dish = DishResponseDto.of(management.dish),
                client = ClientResponseDto.of(management.client),
                managementContent = management.managementContent,
                dishState = management.dishState,
                //TODO : managementImageList
                //TODO : managementCommentList
                isDeleted = management.isDeleted,
                createdDate = management.createdDate,
                updatedDate = management.updatedDate,
            )
        }
    }

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