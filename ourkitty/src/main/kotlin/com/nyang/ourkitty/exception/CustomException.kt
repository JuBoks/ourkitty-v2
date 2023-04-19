package com.nyang.ourkitty.exception

class CustomException(
    val errorCode: ErrorCode
) : RuntimeException()