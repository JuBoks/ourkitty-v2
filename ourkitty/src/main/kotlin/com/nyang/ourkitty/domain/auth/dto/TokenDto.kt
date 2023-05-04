package com.nyang.ourkitty.domain.auth.dto

data class TokenDto(
    val accessToken: String,
    val refreshToken: String,
) {
}