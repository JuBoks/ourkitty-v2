package com.nyang.ourkitty.domain.chart.dto

data class DishCountResultDto(
    val batteryAmountList: List<Int>,
    val foodAmountList: List<Int>,
    val catCountList: List<Int>,
    val noTnrCountList: List<Int>,
) {
}