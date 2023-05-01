package com.nyang.ourkitty.domain.report.dto

class ReportListResultDto(
    val todoList: List<ReportResponseDto>,
    val doneList: List<ReportResponseDto>,
    val totalCount: Long,
) {
}