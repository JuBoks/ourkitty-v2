package com.nyang.ourkitty.domain.report.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.common.ReportState
import com.nyang.ourkitty.common.dto.ImageResponseDto
import com.nyang.ourkitty.domain.client.dto.ClientResponseDto
import com.nyang.ourkitty.domain.management.dto.ManagementImageResponseDto
import com.nyang.ourkitty.entity.ReportEntity
import java.time.LocalDateTime

data class ReportResponseDto(
    val reportId: Long,
    val client: ClientResponseDto,
    val dishId: Long,
    val reportTitle: String,
    val reportCategory: String,
    val reportContent: String,
    val reportState: String,
    var reportImageList: List<ReportImageResponseDto> = emptyList(),
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,

    ) {

    fun setImageList(reportImageResponseDtoList: List<ReportImageResponseDto>) {
        this.reportImageList = reportImageResponseDtoList
    }

    companion object {
        fun of(report: ReportEntity): ReportResponseDto {
            return ReportResponseDto(
                reportId = report.reportId!!,
                client = ClientResponseDto.of(report.client),
                dishId = report.dishId,
                reportTitle = report.reportTitle,
                reportCategory = report.reportCategory,
                reportContent = report.reportContent,
                reportState = report.reportState,
                reportImageList = report.reportImageList.filter { !it.isDeleted }.map(ReportImageResponseDto::of),
                isDeleted = report.isDeleted,
                createdDate = report.createdDate,
                updatedDate = report.updatedDate,
            )
        }
    }

}