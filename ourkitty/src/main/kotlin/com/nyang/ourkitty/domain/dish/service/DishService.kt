package com.nyang.ourkitty.domain.dish.service

import com.nyang.ourkitty.common.AwsS3ImageUploader
import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.dish.dto.DishListResultDto
import com.nyang.ourkitty.domain.dish.dto.DishRequestDto
import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import com.nyang.ourkitty.domain.dish.repository.DishImageRepository
import com.nyang.ourkitty.domain.dish.repository.DishQuerydslRepository
import com.nyang.ourkitty.domain.dish.repository.DishRepository
import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile

@Service
@Transactional(readOnly = true)
class DishService(
    private val dishRepository: DishRepository,
    private val dishQuerydslRepository: DishQuerydslRepository,
    private val dishImageRepository: DishImageRepository,
    private val imageUploader: AwsS3ImageUploader,
) {

    /*
    private val testToken = mapOf(
        "clientId" to 1L,
        "userCode" to UserCode.캣맘.code,
        "locationCode" to LocationCode.해운대구.code,
    ) */

    fun getDishList(locationCode: String): DishListResultDto {
        val dishList = dishQuerydslRepository.getDishList(locationCode)
        val centerPos = dishQuerydslRepository.getCenterPos(locationCode)

        val dishResponseDtoList = dishList
            .filter { !it.isDeleted }
            .map(DishResponseDto::of)

        return DishListResultDto(
            data = dishResponseDtoList,
            centerLat = centerPos.lat!!,
            centerLong = centerPos.long!!,
        )
    }

    @Transactional
    fun createDish(locationCode: String, dishRequestDto: DishRequestDto, file: MultipartFile?): ResultDto<DishResponseDto> {
        //TODO : Entity 변환 과정에서 타입 미스매치 예외처리
        val dish = dishRequestDto.toEntity()
        //TODO : 중복검사 serialNum 으로?
        dish.setDishLocationCode(locationCode)

        if (file != null) {
            val imagePath = imageUploader.uploadImage(file)
            dish.setProfileImage(imagePath)
        }

        return ResultDto(
            data = DishResponseDto.of(
                dishRepository.save(dish)
            )
        )
    }

    fun getDish(dishId: Long): ResultDto<DishResponseDto> {

        return ResultDto(
            data = DishResponseDto.of(
                getDishById(dishId)
            )
        )
    }

    @Transactional
    fun modifyDish(dishId: Long, dishRequestDto: DishRequestDto, file: MultipartFile?): ResultDto<DishResponseDto> {
        val dish = getDishById(dishId)
        val updateParam = dishRequestDto.toEntity()

        if (file != null) {
            val imagePath = imageUploader.uploadImage(file)
            dish.setProfileImage(imagePath)
        }

        dish.modify(updateParam)

        return ResultDto(
            data = DishResponseDto.of(
                dishRepository.save(dish)
            )
        )
    }

    @Transactional
    fun deleteDish(dishId: Long): ResultDto<Boolean> {
        val dish = getDishById(dishId)
        dishRepository.save(dish.delete())
        //TODO : save 과정에서 문제가 발생했을 때 false 를 반환해야 함, Transaction 공부해보기

        return ResultDto(
            data = true
        )
    }

    private fun getDishById(dishId: Long): DishEntity {
        val dish: DishEntity? = dishRepository.findByIdOrNull(dishId)

        if (dish == null || dish.isDeleted) {
            throw CustomException(ErrorCode.NOT_FOUND_DISH)
        }
        return dish
    }

}