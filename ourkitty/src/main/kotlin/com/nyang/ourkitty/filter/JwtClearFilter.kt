package com.nyang.ourkitty.filter

import com.nyang.ourkitty.domain.auth.dto.JwtContextHolder
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Order(1)
@Component
class JwtClearFilter : OncePerRequestFilter() {
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        JwtContextHolder.clear()

        filterChain.doFilter(request, response)
    }
}