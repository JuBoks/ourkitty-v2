package com.nyang.ourkitty.domain.client.dto

import com.nyang.ourkitty.entity.ClientDishEntity

data class ClientDishResponseDto(
    val dishId: Long,
    val dishName: String,
) {

    companion object {
        fun of(clientDishEntity: ClientDishEntity): ClientDishResponseDto {
            return ClientDishResponseDto(
                dishId = clientDishEntity.dish.dishId!!,
                dishName = clientDishEntity.dish.dishName,
            )
        }
    }

}