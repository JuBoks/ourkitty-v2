package com.nyang.ourkitty.domain.chart.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDate

data class DishCountResponseDto(
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    val date: LocalDate,
    val catCount: Int,
    val tnrCount: Int,
) {
}