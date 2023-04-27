package com.nyang.ourkitty.domain.management.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.entity.ManagementImageEntity
import java.time.LocalDateTime

data class ManagementImageResponseDto(
    val managementImageId: Long,
    val imagePath: String,
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,
) {

    companion object {
        fun of(managementImageEntity: ManagementImageEntity): ManagementImageResponseDto {
            return ManagementImageResponseDto(
                managementImageId = managementImageEntity.managementImageId!!,
                imagePath = managementImageEntity.imagePath,
                isDeleted = managementImageEntity.isDeleted,
                createdDate = managementImageEntity.createdDate,
                updatedDate = managementImageEntity.updatedDate,
            )
        }
    }
}