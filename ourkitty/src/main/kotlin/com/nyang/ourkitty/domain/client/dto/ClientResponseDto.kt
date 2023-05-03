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
    val dishList: List<ClientDishResponseDto>,
    val isActive: Boolean,
    val isDeleted: Boolean,
    val clientDescription: String,

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
                dishList = client.dishList.map(ClientDishResponseDto::of),
                isActive = client.isActive,
                isDeleted = client.isDeleted,
                clientDescription = client.clientDescription,
                lastPostingDate = client.lastPostingDate,
                createdDate = client.createdDate,
                updatedDate = client.updatedDate
            )
        }
    }

}