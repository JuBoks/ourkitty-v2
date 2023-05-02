package com.nyang.ourkitty.domain.report.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.domain.client.dto.SimpleClientResponseDto
import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import com.nyang.ourkitty.entity.ReportEntity
import java.time.LocalDateTime

data class ReportResponseDto(
    val reportId: Long,
    val client: SimpleClientResponseDto,
    val dish: DishResponseDto,
    val reportTitle: String,
    val reportCategory: String,
    val reportContent: String,
    val reportDescription: String,
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
                client = SimpleClientResponseDto.of(report.client),
                dish = DishResponseDto.of(report.dish),
                reportTitle = report.reportTitle,
                reportCategory = report.reportCategory,
                reportContent = report.reportContent,
                reportDescription = report.reportDescription,
                reportState = report.reportState,
                reportImageList = report.reportImageList.filter { !it.isDeleted }.map(ReportImageResponseDto::of),
                isDeleted = report.isDeleted,
                createdDate = report.createdDate,
                updatedDate = report.updatedDate,
            )
        }
    }

}