package com.nyang.ourkitty.domain.ai.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDate

data class CatCountRequestDto(
    val dishSerialNum: String,
    val catCount: Int,
    val tnrCount: Int,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    val date: LocalDate,
)