package com.nyang.ourkitty.interceptor

import com.nyang.ourkitty.domain.auth.dto.JwtContextHolder
import org.springframework.web.servlet.HandlerInterceptor
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class LoginInterceptor : HandlerInterceptor {
    
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        if (JwtContextHolder.clientId != null) {
            return true
        }

        if (request.getAttribute("exception") == null) request.setAttribute("exception", "AuthenticationException")
        request.getRequestDispatcher("/auth/error").forward(request, response)
        return false
    }

}