package com.nyang.ourkitty.domain.auth

import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder

class SecurityUtil private constructor() {

    companion object {
        fun getCurrentClientId(): Long {
            val authentication: Authentication? = SecurityContextHolder.getContext().authentication

            if (authentication == null || authentication.name == null) {
                throw CustomException(ErrorCode.JWT_TOKEN_EXCEPTION)
            }

            return authentication.name.toLong()
        }

    }
}