package com.nyang.ourkitty.domain.report.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.common.dto.ImageResponseDto
import com.nyang.ourkitty.domain.client.dto.ClientResponseDto
import java.time.LocalDateTime

data class ReportResponseDto(
    val reportId: Long,
    val client: ClientResponseDto,
    val reportTitle: String,
    val reportCategory: String,
    val reportContent: String,
    val reportState: String,
    val reportImageList: List<ImageResponseDto> = emptyList(),
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,

    ) {

    constructor() : this(
        reportId = 1,
        client = ClientResponseDto(),
        reportTitle = "baebug",
        reportCategory = "0040001",
        reportContent = "report content",
        reportState = "0050001",
        isDeleted = false,
        createdDate = LocalDateTime.now(),
        updatedDate = LocalDateTime.now()
    )


}