package com.nyang.ourkitty.domain.management.dto

import com.nyang.ourkitty.entity.ClientEntity
import com.nyang.ourkitty.entity.ManagementCommentEntity
import com.nyang.ourkitty.entity.ManagementEntity

data class ManagementCommentRequestDto(
    val managementId: Long,
    val managementCommentContent: String,
) {

    fun toEntity(management: ManagementEntity, client: ClientEntity): ManagementCommentEntity {
        return ManagementCommentEntity(
            management = management,
            client = client,
            managementCommentContent = this.managementCommentContent,
        )
    }

}