package com.nyang.ourkitty.domain.management.dto

data class ManagementRequestDto(
    val dishId: Long,
    val clientId: Long,
    val managementContent: String,
    val dishState: String,
) {
}