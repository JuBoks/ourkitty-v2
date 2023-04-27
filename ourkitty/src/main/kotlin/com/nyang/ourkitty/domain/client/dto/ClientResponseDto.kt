package com.nyang.ourkitty.domain.client.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.nyang.ourkitty.entity.ClientEntity
import java.time.LocalDateTime

data class ClientResponseDto(
    val clientId: Long,
    val clientEmail: String,
    val clientName: String,
    val clientNickname: String,
    val clientProfileImagePath: String,
    val clientAddress: String,
    val clientPhone: String,
    val userCode: String,
    val locationCode: String,
    val isDeleted: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val lastPostingDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val createdDate: LocalDateTime,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    val updatedDate: LocalDateTime,
) {

    companion object {
        fun of(client: ClientEntity): ClientResponseDto {
            return ClientResponseDto(
                clientId = client.clientId!!,
                clientEmail = client.clientEmail,
                clientName = client.clientName,
                clientNickname = client.clientNickname,
                clientProfileImagePath = client.clientProfileImagePath,
                clientAddress = client.clientAddress,
                clientPhone = client.clientPhone,
                userCode = client.userCode,
                locationCode = client.locationCode,
                isDeleted = client.isDeleted,
                lastPostingDate = client.lastPostingDate,
                createdDate = client.createdDate,
                updatedDate = client.updatedDate
            )
        }
    }

    constructor() : this(
        1,
        "baebugEmail",
        "baebug",
        "baebug",
        "./default.png",
        "address",
        "010101",
        "0010001",
        "0030001",
        false,
        LocalDateTime.now(),
        LocalDateTime.now(),
        LocalDateTime.now()
    )

}