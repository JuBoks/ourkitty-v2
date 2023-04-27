package com.nyang.ourkitty.domain.dish.dto

class DishListResultDto(
    val data: List<DishResponseDto>,
    val centerLat: Double,
    val centerLong: Double,
) {
}