package com.nyang.ourkitty.domain.management

import com.nyang.ourkitty.common.UserCode
import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.client.repository.ClientRepository
import com.nyang.ourkitty.domain.dish.repository.DishRepository
import com.nyang.ourkitty.domain.management.dto.ManagementCommentRequestDto
import com.nyang.ourkitty.domain.management.dto.ManagementImageResponseDto
import com.nyang.ourkitty.domain.management.dto.ManagementRequestDto
import com.nyang.ourkitty.domain.management.dto.ManagementResponseDto
import com.nyang.ourkitty.domain.management.repository.ManagementCommentRepository
import com.nyang.ourkitty.domain.management.repository.ManagementImageRepository
import com.nyang.ourkitty.domain.management.repository.ManagementQuerydslRepository
import com.nyang.ourkitty.domain.management.repository.ManagementRepository
import com.nyang.ourkitty.entity.ManagementCommentEntity
import com.nyang.ourkitty.entity.ManagementEntity
import com.nyang.ourkitty.entity.ManagementImageEntity
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
    private val managementCommentRepository: ManagementCommentRepository,
    private val managementImageRepository: ManagementImageRepository,
    private val dishRepository: DishRepository,
    private val clientRepository: ClientRepository,
) {

    fun getManagementList(locationCode: String, limit: Long, offset: Long, dishId: Long?): ResultDto<List<ManagementResponseDto>> {
        val managementList = managementQuerydslRepository.getManagementList(locationCode, limit, offset, dishId)
        val totalCount = managementQuerydslRepository.countManagementList(locationCode, dishId)

        val managementDtoList = managementList
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
            ),
        )
    }

    @Transactional
    fun createManagement(clientId: Long, locationCode: String, managementRequestDto: ManagementRequestDto, files: List<String>?): ResultDto<ManagementResponseDto> {
        val dish = dishRepository.findByIdOrNull(managementRequestDto.dishId) ?: throw CustomException(ErrorCode.NOT_FOUND_DISH)
        val client = clientRepository.findByIdOrNull(clientId) ?: throw CustomException(ErrorCode.NOT_FOUND_CLIENT)
        client.updateLastPostingDate()

        val management = managementRequestDto.toEntity(
            dish = dish,
            client = client,
            locationCode = locationCode,
        )

        val managementResponseDto = ManagementResponseDto.of(managementRepository.save(management))

        if (files != null) {
            val managementImageList = files
                .map { imagePath ->
                    ManagementImageEntity(
                        management = management,
                        imagePath = imagePath,
                    )
                }
                .map(managementImageRepository::save)

            val managementImageResponseDtoList = managementImageList
                .filter { !it.isDeleted }
                .map(ManagementImageResponseDto::of)

            managementResponseDto.setImageList(managementImageResponseDtoList)
        }

        return ResultDto(
            data = managementResponseDto,
        )
    }

    @Transactional
    fun modifyManagement(managementId: Long, managementRequestDto: ManagementRequestDto, deleteList: List<Long>?, insertList: List<String>?): ResultDto<ManagementResponseDto> {
        val management = getManagementById(managementId)
        val client = clientRepository.findByIdOrNull(management.client.clientId!!.toLong()) ?: throw CustomException(ErrorCode.NOT_FOUND_CLIENT)
        client.updateLastPostingDate()

        management.update(
            managementContent = managementRequestDto.managementContent,
            dishState = managementRequestDto.dishState,
        )

        val managementResponseDto = ManagementResponseDto.of(managementRepository.save(management))

        // 삭제된 이미지가 있으면 지운다.
        deleteList?.forEach { management.deleteImage(it) }

        // 추가된 이미지가 있으면 업데이트 한다.
        if (insertList != null) {
            val newImageList = insertList
                .map { imagePath ->
                    ManagementImageEntity(
                        management = management,
                        imagePath = imagePath,
                    )
                }
                .map(managementImageRepository::save)

            management.addImages(newImageList)
        }

        val managementImageResponseDtoList = management.managementImageList
            .filter { !it.isDeleted }
            .map(ManagementImageResponseDto::of)

        managementResponseDto.setImageList(managementImageResponseDtoList)

        return ResultDto(
            data = managementResponseDto,
        )
    }

    @Transactional
    fun deleteManagement(managementId: Long, clientId: Long, userCode: String, locationCode: String): ResultDto<Boolean> {
        val management = getManagementById(managementId)

        if (management.client.clientId != clientId || !(userCode == UserCode.지자체.code && management.locationCode == locationCode)) throw CustomException(ErrorCode.NO_ACCESS)

        management.delete()

        managementRepository.save(management)

        return ResultDto(
            data = true,
        )
    }

    @Transactional
    fun createManagementComment(managementId: Long, clientId: Long, managementCommentRequestDto: ManagementCommentRequestDto): ResultDto<ManagementResponseDto> {
        val management = managementRepository.findByIdOrNull(managementId) ?: throw CustomException(ErrorCode.NOT_FOUND_MANAGEMENT)
        val client = clientRepository.findByIdOrNull(clientId) ?: throw CustomException(ErrorCode.NOT_FOUND_CLIENT)
        client.updateLastPostingDate()

        managementCommentRequestDto.toEntity(
            management = management,
            client = client
        ).run(managementCommentRepository::save)

        return ResultDto(
            data = ManagementResponseDto.of(management),
        )
    }

    @Transactional
    fun deleteManagementComment(managementId: Long, clientId: Long, userCode: String, locationCode: String, managementCommentId: Long): ResultDto<Boolean> {
        val managementComment = getManagementCommentById(managementCommentId)

        if (managementComment.client.clientId != clientId || userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        managementComment.delete()
        managementCommentRepository.save(managementComment)

        return ResultDto(
            data = true,
        )
    }

    private fun getManagementById(managementId: Long): ManagementEntity {
        val management: ManagementEntity? = managementRepository.findByIdOrNull(managementId)

        if (management == null || management.isDeleted) {
            throw CustomException(ErrorCode.NOT_FOUND_MANAGEMENT)
        }
        return management
    }

    private fun getManagementCommentById(managementCommentId: Long): ManagementCommentEntity {
        val managementComment: ManagementCommentEntity? = managementCommentRepository.findByIdOrNull(managementCommentId)

        if (managementComment == null || managementComment.isDeleted) {
            throw CustomException(ErrorCode.NOT_FOUND_COMMENT)
        }
        return managementComment
    }

}