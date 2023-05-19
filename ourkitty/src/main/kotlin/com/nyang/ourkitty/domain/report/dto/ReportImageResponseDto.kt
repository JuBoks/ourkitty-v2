package com.nyang.ourkitty.domain.report.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.entity.ReportImageEntity
import java.time.LocalDateTime

data class ReportImageResponseDto(
    val reportImageId: Long,
    val imagePath: String,
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,
) {

    companion object {
        fun of(reportImageEntity: ReportImageEntity): ReportImageResponseDto {
            return ReportImageResponseDto(
                reportImageId = reportImageEntity.reportImageId!!,
                imagePath = reportImageEntity.imagePath,
                isDeleted = reportImageEntity.isDeleted,
                createdDate = reportImageEntity.createdDate,
                updatedDate = reportImageEntity.updatedDate,
            )
        }
    }

}