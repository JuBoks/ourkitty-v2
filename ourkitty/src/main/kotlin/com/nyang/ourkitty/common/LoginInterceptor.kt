package com.nyang.ourkitty.common

import com.nyang.ourkitty.domain.auth.dto.JwtContextHolder
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.web.servlet.HandlerInterceptor
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class LoginInterceptor : HandlerInterceptor {
    
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        if (JwtContextHolder.clientId == null) {
            throw CustomException(ErrorCode.NO_ACCESS)
        }

        return true
    }

}