package com.nyang.ourkitty.domain.auth.dto

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken

data class LoginRequestDto(
    val clientEmail: String,
    val clientPassword: String,
) {

    fun toAuthentication(): UsernamePasswordAuthenticationToken {
        return UsernamePasswordAuthenticationToken(clientEmail, clientPassword)
    }
    
}