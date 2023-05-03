package com.nyang.ourkitty.domain.client.dto

import com.nyang.ourkitty.entity.ClientEntity

data class SimpleClientResponseDto(
    val clientId: Long,
    val clientNickname: String,
) {

    companion object {
        fun of(client: ClientEntity): SimpleClientResponseDto {
            return SimpleClientResponseDto(
                clientId = client.clientId!!,
                clientNickname = client.clientNickname,
            )
        }
    }

}