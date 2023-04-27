package com.nyang.ourkitty.domain.management.dto

data class ManagementCommentRequestDto(
    val managementId: Long,
    val clientId: Long,
    val managementCommentContent: String,
) {
}