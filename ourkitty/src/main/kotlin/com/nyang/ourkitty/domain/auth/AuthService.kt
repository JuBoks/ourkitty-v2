package com.nyang.ourkitty.domain.auth

import com.nyang.ourkitty.domain.auth.dto.LoginRequestDto
import com.nyang.ourkitty.domain.auth.dto.TokenDto
import com.nyang.ourkitty.domain.auth.repository.RefreshTokenRepository
import com.nyang.ourkitty.domain.client.repository.ClientQuerydslRepository
import com.nyang.ourkitty.domain.client.repository.ClientRepository
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class AuthService(
    private val authenticationManagerBuilder: AuthenticationManagerBuilder,
    private val tokenProvider: TokenProvider,

    private val refreshTokenRepository: RefreshTokenRepository,

    private val clientRepository: ClientRepository,
    private val clientQuerydslRepository: ClientQuerydslRepository,
) {

    @Transactional
    fun signin(loginRequestDto: LoginRequestDto): TokenDto {
        val authenticationToken: UsernamePasswordAuthenticationToken = loginRequestDto.toAuthentication()

        val authentication: Authentication = authenticationManagerBuilder.`object`.authenticate(authenticationToken)

        val tokenDto: TokenDto = tokenProvider.generateTokenDto(authentication)

        val refreshToken = RefreshToken(
            key = authentication.name,
            value = tokenDto.refreshToken,
        )

        refreshTokenRepository.save(refreshToken)

        return tokenDto
    }
}