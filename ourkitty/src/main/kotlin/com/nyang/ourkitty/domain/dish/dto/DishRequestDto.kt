package com.nyang.ourkitty.domain.dish.dto

import com.nyang.ourkitty.entity.DishEntity

data class DishRequestDto(
    val dishName: String,
    val dishLat: String,
    val dishLong: String,
    val dishAddress: String,
    val dishSerialNum: String,
) {

    fun toEntity(): DishEntity {
        //TODO : 이상한 값이 넘어와서 toDouble 이 실패하는 경우 대비
        return DishEntity(
            dishName = dishName,
            dishLat = dishLat.toDouble(),
            dishLong = dishLong.toDouble(),
            dishAddress = dishAddress,
            dishSerialNum = dishSerialNum,
        )
    }
}