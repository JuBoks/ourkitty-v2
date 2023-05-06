package com.nyang.ourkitty.domain.auth

import com.nyang.ourkitty.domain.auth.dto.TokenDto
import com.nyang.ourkitty.entity.ClientEntity
import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys
import io.jsonwebtoken.security.SecurityException
import org.apache.commons.logging.LogFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*
import javax.servlet.http.HttpServletRequest

@Component
class JwtTokenProvider(
    @Value("\${jwt.secret}") private val secretKey: String,
) {

    private val key: Key = Keys.hmacShaKeyFor(secretKey.toByteArray())
    private val log = LogFactory.getLog(JwtTokenProvider::class.java)!!

    companion object {
        private const val ACCESS_TOKEN_EXPIRE_TIME: Long = 1000 * 60 * 30
        private const val REFRESH_TOKEN_EXPIRE_TIME: Long = 1000 * 60 * 60 * 24 * 7
    }

    fun createToken(client: ClientEntity): TokenDto {
        val claims = Jwts.claims().apply {
            put("clientId", client.clientId)
            put("locationCode", client.locationCode)
            put("userCode", client.userCode)
        }

        val now = Date()
        val accessTokenExpiration = Date(now.time + ACCESS_TOKEN_EXPIRE_TIME)
        val accessToken = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(accessTokenExpiration)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()

        val refreshTokenExpiration = Date(now.time + REFRESH_TOKEN_EXPIRE_TIME)
        val refreshToken = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(refreshTokenExpiration)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()

        return TokenDto(
            accessToken = accessToken,
            refreshToken = refreshToken,
        )
    }

    fun validateToken(request: HttpServletRequest, token: String): Boolean {
        return try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            true
        } catch (e: Exception) {
            when (e) {
                is SecurityException, is MalformedJwtException -> log.error("잘못된 JWT 서명입니다.")
                is ExpiredJwtException -> log.error("만료된 JWT 토큰입니다.")
                is UnsupportedJwtException -> log.error("지원되지 않는 JWT 토큰입니다.")
                is IllegalArgumentException -> log.error("JWT 토큰이 잘못되었습니다.")
            }
            request.setAttribute("exception", "JWTException")
            false
        }
    }

    fun getClaimsFromToken(token: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body
    }

}