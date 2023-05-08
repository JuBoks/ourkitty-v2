package com.nyang.ourkitty.domain.dish.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.entity.DishImageEntity
import java.time.LocalDateTime

data class DishImageResponseDto(
    val dishImageId: Long,
    val imagePath: String,
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,
) {

    companion object {
        fun of(dishImage: DishImageEntity): DishImageResponseDto {
            return DishImageResponseDto(
                dishImageId = dishImage.dishImageId!!,
                imagePath = dishImage.imagePath,
                isDeleted = dishImage.isDeleted,
                createdDate = dishImage.createdDate,
                updatedDate = dishImage.updatedDate,
            )
        }
    }

}