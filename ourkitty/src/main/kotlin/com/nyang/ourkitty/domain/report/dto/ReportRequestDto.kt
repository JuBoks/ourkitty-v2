package com.nyang.ourkitty.domain.report.dto

import com.nyang.ourkitty.entity.ClientEntity
import com.nyang.ourkitty.entity.ReportEntity

data class ReportRequestDto(
    val dishId: Long,
    val reportTitle: String,
    val reportCategory: String,
    val reportContent: String,
) {
    fun toEntity(client: ClientEntity, locationCode: String): ReportEntity {
        return ReportEntity(
            client = client,
            dishId = this.dishId,
            reportTitle = this.reportTitle,
            reportCategory = this.reportCategory,
            reportContent = this.reportContent,
            locationCode = locationCode,
        )
    }
}