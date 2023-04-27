package com.nyang.ourkitty.domain.management.dto

import com.nyang.ourkitty.entity.ClientEntity
import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.entity.ManagementEntity

data class ManagementRequestDto(
    val dishId: Long,
    val clientId: Long,
    val managementContent: String,
    val dishState: String,
) {

    fun toEntity(dish: DishEntity, client: ClientEntity, locationCode: String): ManagementEntity {
        return ManagementEntity(
            dish = dish,
            client = client,
            managementContent = this.managementContent,
            dishState = this.dishState,
            locationCode = locationCode,
        )
    }
}