package com.nyang.ourkitty.domain.dish.dto

import com.nyang.ourkitty.entity.DishEntity

data class DishRequestDto(
    val dishName: String,
    val dishLat: Double,
    val dishLong: Double,
    val dishAddress: String,
    val dishSerialNum: String,
) {

    fun toEntity(): DishEntity {
        return DishEntity(
            dishName = dishName,
            dishLat = dishLat,
            dishLong = dishLong,
            dishAddress = dishAddress,
            dishSerialNum = dishSerialNum,
        )
    }
}