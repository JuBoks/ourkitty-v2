package com.nyang.ourkitty.domain.chart.dto

data class DishCountResultDto(
    val batteryAmountList: List<Int>,
    val foodAmountList: List<Double>,
    val catCountList: List<Int>,
    val tnrCountList: List<Int>,
) {
}