package com.nyang.ourkitty.domain.dish.dto

import com.nyang.ourkitty.entity.DishEntity

data class DishRequestDto(
    val dishName: String,
    val dishProfileImagePath: String,
    val dishLat: Double,
    val dishLong: Double,
    val dishAddress: String,
    val locationCode: String,
    val dishSerialNum: String = "",
) {

    fun toEntity(): DishEntity {
        return DishEntity(
            dishName = dishName,
            dishProfileImagePath = dishProfileImagePath,
            dishLat = dishLat,
            dishLong = dishLong,
            dishAddress = dishAddress,
            locationCode = locationCode,
            dishSerialNum = dishSerialNum,
        )
    }
}