package com.nyang.ourkitty.common.dto

enum class ResultCode(
    val message: String,
) {
    SUCCESS("success"),
    FAIL("fail"),
    ;
}