package com.nyang.ourkitty.config

import com.nyang.ourkitty.common.LoginInterceptor
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {

    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(LoginInterceptor())
            .order(1)
            .addPathPatterns("/**")
            .excludePathPatterns("/", "/auth/**", "/css/**", "/*.ico", "/error")
    }
    
}