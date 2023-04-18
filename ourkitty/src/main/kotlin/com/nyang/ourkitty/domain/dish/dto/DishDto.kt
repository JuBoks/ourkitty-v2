package com.nyang.ourkitty.domain.dish.dto

import com.nyang.ourkitty.entity.DishEntity

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
        //TODO 로직 구현
        return DishEntity()
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
) {
    constructor(dishEntity: DishEntity) : this(
        dishId = dishEntity.dishId!!,
        dishName = dishEntity.dishName,
        dishProfileImagePath = dishEntity.dishProfileImagePath,
        dishLat = dishEntity.dishLat,
        dishLong = dishEntity.dishLong,
        dishAddress = dishEntity.dishAddress,
        locationCode = dishEntity.locationCode,
        dishSerialNum = dishEntity.dishSerialNum,
        dishWeight = dishEntity.dishWeight,
        dishCatCount = dishEntity.dishCatCount,
        dishTnrCount = dishEntity.dishTNRCount
    )

    // 목업용 빈값
    constructor() : this(
        DishEntity()
    )
}