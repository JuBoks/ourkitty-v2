package com.nyang.ourkitty.domain.ai.dto

data class CatCountRequestDto(
    val dishSerialNum: String,
    val catCount: Int,
    val tnrCount: Int,
) {
}