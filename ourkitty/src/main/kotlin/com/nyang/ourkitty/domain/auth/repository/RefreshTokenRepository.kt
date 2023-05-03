package com.nyang.ourkitty.domain.auth.repository

import com.nyang.ourkitty.domain.auth.RefreshToken
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RefreshTokenRepository : JpaRepository<RefreshToken, String> {
}