package com.nyang.ourkitty.filter

import com.nyang.ourkitty.domain.auth.JwtTokenProvider
import com.nyang.ourkitty.domain.auth.dto.JwtContextHolder
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Order(2)
@Component
class JwtFilter(
    private val jwtTokenProvider: JwtTokenProvider,
) : OncePerRequestFilter() {

    companion object {
        private const val AUTHORIZATION_HEADER = "Authorization"
        private const val TOKEN_PREFIX = "Bearer "
    }

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        val token = resolveToken(request)
        if (token != null && jwtTokenProvider.validateToken(request, token)) {
            val claims = jwtTokenProvider.getClaimsFromToken(token)

            JwtContextHolder.clientId = claims["clientId"]?.toString()
            JwtContextHolder.locationCode = claims["locationCode"]?.toString()
            JwtContextHolder.userCode = claims["userCode"]?.toString()
        }

        filterChain.doFilter(request, response)
    }

    private fun resolveToken(request: HttpServletRequest): String? {
        val bearerToken = request.getHeader(AUTHORIZATION_HEADER)
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length).trim()
        }
        return null
    }
}