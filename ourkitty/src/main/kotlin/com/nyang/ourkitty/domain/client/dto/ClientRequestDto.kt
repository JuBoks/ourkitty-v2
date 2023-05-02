package com.nyang.ourkitty.domain.client.dto

import com.nyang.ourkitty.entity.ClientEntity

data class ClientRequestDto(
    val clientEmail: String,
    val clientPassword: String,
    val clientName: String,
    val clientAddress: String,
    val clientPhone: String,
    val clientNickname: String = "user",
    val clientProfileImagePath: String,
    val dishList: List<Long> = emptyList(),
) {

    fun toEntity(locationCode: String): ClientEntity {
        return ClientEntity(
            clientEmail = this.clientEmail,
            clientPassword = this.clientPassword,
            clientName = this.clientName,
            clientNickname = this.clientNickname,
            clientProfileImagePath = this.clientProfileImagePath,
            clientAddress = this.clientAddress,
            clientPhone = this.clientPhone,
            locationCode = locationCode,
        )
    }

}