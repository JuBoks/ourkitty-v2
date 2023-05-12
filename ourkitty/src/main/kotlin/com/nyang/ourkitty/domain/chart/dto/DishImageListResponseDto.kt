package com.nyang.ourkitty.domain.chart.dto

data class DishImageListResponseDto(
    val size: Int = 0,
    val imageList: List<String> = emptyList(),
) {
}