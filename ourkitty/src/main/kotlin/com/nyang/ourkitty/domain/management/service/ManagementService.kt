package com.nyang.ourkitty.domain.management.service

import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.management.dto.ManagementResponseDto
import com.nyang.ourkitty.domain.management.repository.ManagementQuerydslRepository
import com.nyang.ourkitty.domain.management.repository.ManagementRepository
import org.springframework.stereotype.Service

@Service
class ManagementService(
    private val managementRepository: ManagementRepository,
    private val managementQuerydslRepository: ManagementQuerydslRepository,
) {
    fun getManagementList(locationCode: String, limit: Long, offset: Long, id: Long?): ResultDto<List<ManagementResponseDto>> {
        val managementList = managementQuerydslRepository.getManagementList(locationCode, limit, offset, id)
        val totalCount = managementQuerydslRepository.countManagementList(locationCode, id)

        val managementDtoList = managementList
            .filter { !it.isDeleted }
            .map(ManagementResponseDto::of)

        return ResultDto(
            data = managementDtoList,
            totalCount = totalCount,
        )
    }
}