package com.nyang.ourkitty.domain.iot.dto

data class DishWeightRequestDto(
    val dishSerialNum: String,
    val dishWeight: Double,
)