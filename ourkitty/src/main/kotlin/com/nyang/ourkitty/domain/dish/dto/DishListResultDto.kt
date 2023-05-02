package com.nyang.ourkitty.domain.dish.dto

data class DishListResultDto(
    val data: List<DishResponseDto>,
    val centerLat: Double,
    val centerLong: Double,
)