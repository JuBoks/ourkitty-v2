package com.nyang.ourkitty.domain.chart.dto

data class HeatMapResponseDto(
    val name: String, // 00 ~ 23
    val data: MutableList<Int> = MutableList(7) { 0 }
) {
}