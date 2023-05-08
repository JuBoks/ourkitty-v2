package com.nyang.ourkitty.domain.chart.dto

data class ChartResultDto<T>(
    val name: String,
    val data: List<T>,
) {
}