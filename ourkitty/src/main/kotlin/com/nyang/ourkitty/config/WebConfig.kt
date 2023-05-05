package com.nyang.ourkitty.config

import com.nyang.ourkitty.interceptor.LoginInterceptor
import org.springframework.context.annotation.Configuration
import org.springframework.format.FormatterRegistry
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.time.format.DateTimeFormatter

@Configuration
class WebConfig : WebMvcConfigurer {

    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(LoginInterceptor())
            .order(1)
            .addPathPatterns("/**")
            .excludePathPatterns(
                "/auth/**",
                "/v2/api-docs",
                "/swagger-ui/**",
                "/swagger-resources/**",
                "/*.ico",
                "/error"
            )
    }

    override fun addFormatters(registry: FormatterRegistry) {
        val registrar = DateTimeFormatterRegistrar()
        registrar.setDateTimeFormatter(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"))
        registrar.registerFormatters(registry)
    }

}