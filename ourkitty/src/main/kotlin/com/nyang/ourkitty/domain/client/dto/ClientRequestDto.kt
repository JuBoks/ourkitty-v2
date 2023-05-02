package com.nyang.ourkitty.domain.client.dto

import com.nyang.ourkitty.entity.ClientEntity

data class ClientRequestDto(
    val clientEmail: String,
    val clientPassword: String,
    val clientName: String,
    val clientAddress: String,
    val clientNickname: String = "user",
    val dishList: List<Long> = emptyList(),
) {

    fun toEntity(): ClientEntity {
        return ClientEntity(
            clientEmail = this.clientEmail,
            clientPassword = this.clientPassword,
            clientName = this.clientName,
            clientNickname = this.clientNickname,
            clientAddress = this.clientAddress,
        )
    }

}