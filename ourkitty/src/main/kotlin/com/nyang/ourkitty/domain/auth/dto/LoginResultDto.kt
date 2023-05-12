package com.nyang.ourkitty.domain.auth.dto

data class LoginResultDto<T>(
    val code: String, // 0: active, 1: deactive, 2: deleted
    val data: T,
)