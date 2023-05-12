package com.nyang.ourkitty.domain.client.dto

data class ClientListResultDto(
    val activeList: MutableList<ClientResponseDto> = arrayListOf(),
    val inactiveList: MutableList<ClientResponseDto> = arrayListOf(),
    val deletedList: MutableList<ClientResponseDto> = arrayListOf(),
) {
}