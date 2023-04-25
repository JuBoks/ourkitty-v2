package com.nyang.ourkitty.domain.client.dto

import com.nyang.ourkitty.common.LocationCode
import com.nyang.ourkitty.domain.dish.dto.DishRequestDto
import com.nyang.ourkitty.entity.ClientEntity

data class ClientRequestDto(
    val clientEmail: String,
    val clientPassword: String,
    val clientName: String,
    val clientNickname: String = "default",
    val clientProfileImagePath: String = "./default.png",
    val clientAddress: String,
    val clientPhone: String,
    val locationCode: LocationCode,
    val dishList: List<DishRequestDto> = emptyList(),
) {

    fun toEntity(): ClientEntity {
        return ClientEntity(
            clientEmail = clientEmail,
            clientPassword = clientPassword,
            clientName = clientName,
            clientNickname = clientNickname,
            clientProfileImagePath = clientProfileImagePath,
            clientAddress = clientAddress,
            clientPhone = clientPhone,
            locationCode = locationCode,
        )
    }

}