package com.nyang.ourkitty.domain.auth

import com.nyang.ourkitty.domain.auth.dto.TokenDto
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import io.jsonwebtoken.*
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import io.jsonwebtoken.security.SecurityException
import org.apache.commons.logging.LogFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*

@Component
class TokenProvider(
    @Value("\${jwt.secret}") private val secretKey: String,
) {

    private val key: Key
    private val log = LogFactory.getLog(TokenProvider::class.java)!!

    init {
        val ketBytes = Decoders.BASE64.decode(secretKey)
        this.key = Keys.hmacShaKeyFor(ketBytes)
    }

    companion object {
        private const val AUTHORITIES_KEY: String = "auth"
        private const val BEARER_TYPE: String = "Bearer"
        private const val ACCESS_TOKEN_EXPIRE_TIME: Long = 1000 * 60 * 30
        private const val REFRESH_TOKEN_EXPIRE_TIME: Long = 1000 * 60 * 60 * 24 * 7
    }

    fun generateTokenDto(authentication: Authentication): TokenDto {
        val authorities: String = authentication.authorities
            .joinToString(",", transform = GrantedAuthority::getAuthority)

        val now: Long = (Date()).time

        val accessTokenExpiresIn: Date = Date(now + ACCESS_TOKEN_EXPIRE_TIME)
        val accessToken: String = Jwts.builder()
            .setSubject(authentication.name)
            .claim(AUTHORITIES_KEY, authorities)
            .setExpiration(accessTokenExpiresIn)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()

        val refreshToken: String = Jwts.builder()
            .setExpiration(Date(now + REFRESH_TOKEN_EXPIRE_TIME))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()

        return TokenDto(
            grantType = BEARER_TYPE,
            accessToken = accessToken,
            accessTokenExpiresIn = accessTokenExpiresIn.time,
            refreshToken = refreshToken,
        )
    }

    fun getAuthentication(accessToken: String): Authentication {
        val claims: Claims = parseClaims(accessToken)

        if (claims[AUTHORITIES_KEY] == null) {
            throw CustomException(ErrorCode.JWT_TOKEN_EXCEPTION)
        }

        val authorities: List<GrantedAuthority> = claims[AUTHORITIES_KEY].toString().split(",").map(::SimpleGrantedAuthority)

        val principal: UserDetails = User(claims.subject, "", authorities)

        return UsernamePasswordAuthenticationToken(principal, "", authorities)
    }

    fun validateToken(token: String): Boolean {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            return true
        } catch (e: Exception) {
            when (e) {
                is SecurityException, is MalformedJwtException -> log.info("잘못된 JWT 서명입니다.")
                is ExpiredJwtException -> log.info("만료된 JWT 토큰입니다.")
                is UnsupportedJwtException -> log.info("지원되지 않는 JWT 토큰입니다.")
                is IllegalArgumentException -> log.info("JWT 토큰이 잘못되었습니다.")
            }
        }
        return false
    }

    private fun parseClaims(accessToken: String): Claims {
        return try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).body
        } catch (e: ExpiredJwtException) {
            e.claims
        }
    }

}