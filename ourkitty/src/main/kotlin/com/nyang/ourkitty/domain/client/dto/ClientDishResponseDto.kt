package com.nyang.ourkitty.domain.client.dto

import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import com.nyang.ourkitty.entity.ClientDishEntity

data class ClientDishResponseDto(
    val clientDishId: Long,
    val dish: DishResponseDto,
) {

    companion object {
        fun of(clientDishEntity: ClientDishEntity): ClientDishResponseDto {
            return ClientDishResponseDto(
                clientDishId = clientDishEntity.clientDishId!!,
                dish = DishResponseDto.of(clientDishEntity.dish),
            )
        }
    }

}