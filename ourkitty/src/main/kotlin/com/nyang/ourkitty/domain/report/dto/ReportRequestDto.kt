package com.nyang.ourkitty.domain.report.dto

data class ReportRequestDto(
    val clientId: Long,
    val reportTitle: String,
    val reportCategory: String,
    val reportContent: String,
    val reportState: String,
) {
}