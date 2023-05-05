package com.nyang.ourkitty.interceptor

import com.nyang.ourkitty.domain.auth.dto.JwtContextHolder
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.web.servlet.HandlerInterceptor
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class LoginInterceptor : HandlerInterceptor {
    
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        if (JwtContextHolder.clientId != null) {
            return true
        }

        request.setAttribute("exception", "AuthenticationException")
        request.getRequestDispatcher("/auth/error").forward(request, response)
        return false
    }

}