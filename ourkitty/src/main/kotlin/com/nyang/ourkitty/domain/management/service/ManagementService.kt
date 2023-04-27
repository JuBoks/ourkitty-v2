package com.nyang.ourkitty.domain.management.service

import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.management.dto.ManagementResponseDto
import com.nyang.ourkitty.domain.management.repository.ManagementQuerydslRepository
import com.nyang.ourkitty.domain.management.repository.ManagementRepository
import com.nyang.ourkitty.entity.ManagementEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ManagementService(
    private val managementRepository: ManagementRepository,
    private val managementQuerydslRepository: ManagementQuerydslRepository,
) {
    fun getManagementList(locationCode: String, limit: Long, offset: Long, dishId: Long?): ResultDto<List<ManagementResponseDto>> {
        val managementList = managementQuerydslRepository.getManagementList(locationCode, limit, offset, dishId)
        val totalCount = managementQuerydslRepository.countManagementList(locationCode, dishId)

        val managementDtoList = managementList
            .filter { !it.isDeleted }
            .map(ManagementResponseDto::of)

        return ResultDto(
            data = managementDtoList,
            totalCount = totalCount,
        )
    }

    fun getManagement(managementId: Long): ResultDto<ManagementResponseDto> {

        return ResultDto(
            data = ManagementResponseDto.of(
                getManagementById(managementId)
            )
        )
    }

    private fun getManagementById(managementId: Long): ManagementEntity {
        val management: ManagementEntity? = managementRepository.findByIdOrNull(managementId)

        if (management == null || management.isDeleted) {
            throw CustomException(ErrorCode.NOT_FOUND_MANAGEMENT)
        }
        return management
    }
}