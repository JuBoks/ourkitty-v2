package com.nyang.ourkitty.domain.management.dto

import com.fasterxml.jackson.annotation.JsonFormat
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
    var managementImageList: List<ManagementImageResponseDto> = emptyList(),
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
                managementImageList = management.managementImageList.filter { !it.isDeleted }.map(ManagementImageResponseDto::of),
                managementCommentList = management.managementCommentList.filter { !it.isDeleted }.map(ManagementCommentResponseDto::of),
                isDeleted = management.isDeleted,
                createdDate = management.createdDate,
                updatedDate = management.updatedDate,
            )
        }
    }

    fun setImageList(managementImageList: List<ManagementImageResponseDto>) {
        this.managementImageList = managementImageList
    }
    
}