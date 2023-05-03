package com.nyang.ourkitty.domain.auth.dto

data class TokenDto(
    val grantType: String,
    val accessToken: String,
    val refreshToken: String,
    val accessTokenExpiresIn: Long,
) {
}