package com.nyang.ourkitty.domain.auth.dto

data class LoginRequestDto(
    val clientEmail: String,
    val clientPassword: String,
) {
}