package com.nyang.ourkitty.domain.client.dto

import com.nyang.ourkitty.entity.ClientEntity
import org.springframework.security.crypto.password.PasswordEncoder

data class ClientRequestDto(
    val clientEmail: String = "",
    val clientName: String = "",
    val clientPhone: String = "",
    val clientAddress: String = "",
    val clientPassword: String = "",
    val clientNickname: String = "user",
    val dishList: List<Long> = emptyList(),
) {

    fun toEntity(passwordEncoder: PasswordEncoder): ClientEntity {
        return ClientEntity(
            clientEmail = this.clientEmail,
            clientPassword = if (this.clientPassword != "") passwordEncoder.encode(this.clientPassword) else "",
            clientName = this.clientName,
            clientNickname = this.clientNickname,
            clientAddress = this.clientAddress,
            clientPhone = this.clientPhone,
        )
    }

}