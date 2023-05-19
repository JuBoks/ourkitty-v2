package com.nyang.ourkitty.common.dto

data class ResultDto<T>(
    val data: T,
    val totalCount: Long = 1L,
)