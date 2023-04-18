package com.nyang.ourkitty.domain.dish.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.entity.DishEntity
import java.time.LocalDateTime

data class DishRequestDto(
    val dishName: String,
    val dishProfileImagePath: String,
    val dishLat: Double,
    val dishLong: Double,
    val dishAddress: String,
    val locationCode: String,
    val dishSerialNum: String,
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

data class DishResponseDto(
    val dishId: Long,
    val dishName: String,
    val dishProfileImagePath: String,
    val dishLat: Double,
    val dishLong: Double,
    val dishAddress: String,
    val locationCode: String,
    val dishSerialNum: String,
    val dishWeight: Double,
    val dishCatCount: Int,
    val dishTnrCount: Int,
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,
) {
    constructor(dish: DishEntity) : this(
        dishId = dish.dishId!!,
        dishName = dish.dishName,
        dishProfileImagePath = dish.dishProfileImagePath,
        dishLat = dish.dishLat,
        dishLong = dish.dishLong,
        dishAddress = dish.dishAddress,
        locationCode = dish.locationCode,
        dishSerialNum = dish.dishSerialNum,
        dishWeight = dish.dishWeight,
        dishCatCount = dish.dishCatCount,
        dishTnrCount = dish.dishTnrCount,
        isDeleted = dish.isDeleted,
        createdDate = dish.createdDate,
        updatedDate = dish.updatedDate
    )

}