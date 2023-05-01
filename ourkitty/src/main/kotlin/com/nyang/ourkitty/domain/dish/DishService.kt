package com.nyang.ourkitty.domain.dish

import com.nyang.ourkitty.common.AwsS3ImageUploader
import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.ai.dto.CatCountRequestDto
import com.nyang.ourkitty.domain.ai.dto.ImageRequestDto
import com.nyang.ourkitty.domain.dish.dto.DishListResultDto
import com.nyang.ourkitty.domain.dish.dto.DishRequestDto
import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import com.nyang.ourkitty.domain.dish.repository.DishImageRepository
import com.nyang.ourkitty.domain.dish.repository.DishQuerydslRepository
import com.nyang.ourkitty.domain.dish.repository.DishRepository
import com.nyang.ourkitty.domain.dish.repository.DishWeightLogRepository
import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.entity.DishImageEntity
import com.nyang.ourkitty.entity.DishWeightLogEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile

@Service
@Transactional(readOnly = true)
class DishService(
    private val dishRepository: DishRepository,
    private val dishQuerydslRepository: DishQuerydslRepository,
    private val dishWeightLogRepository: DishWeightLogRepository,
    private val dishImageRepository: DishImageRepository,
    private val imageUploader: AwsS3ImageUploader,
) {

    fun getDishList(locationCode: String): DishListResultDto {
        val dishList = dishQuerydslRepository.getDishList(locationCode)
        val centerPos = dishQuerydslRepository.getCenterPos(locationCode)

        val dishResponseDtoList = dishList
            .map(DishResponseDto::of)

        return DishListResultDto(
            data = dishResponseDtoList,
            centerLat = centerPos.lat,
            centerLong = centerPos.long,
        )
    }

    @Transactional
    fun createDish(locationCode: String, dishRequestDto: DishRequestDto, file: MultipartFile?): ResultDto<DishResponseDto> {
        //TODO : Entity 변환 과정에서 타입 미스매치 예외처리
        val dish = dishRequestDto.toEntity()

        if (dishQuerydslRepository.getDishBySerialNum(dish.dishSerialNum) != null) {
            throw CustomException(ErrorCode.DUPLICATE_RESOURCE)
        }

        dish.updateLocationCode(locationCode)
        dish.updateDishWeight(100.0)

        if (file != null) {
            val imagePath = imageUploader.uploadImage(file)
            dish.updateProfileImage(imagePath)
        }

        return ResultDto(
            data = DishResponseDto.of(
                dishRepository.save(dish)
            )
        )
    }

    @Transactional
    fun createDishImage(imageRequestDto: ImageRequestDto): ResultDto<Boolean> {
        val dish = getDishBySerialNum(imageRequestDto.dishSerialNum)

        val dishImage = DishImageEntity(
            dish = dish,
            imagePath = imageRequestDto.imagePath,
        )

        dishImageRepository.save(dishImage)

        return ResultDto(
            data = true,
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
            dish.updateProfileImage(imagePath)
        }

        dish.update(updateParam)

        return ResultDto(
            data = DishResponseDto.of(
                dishRepository.save(dish)
            )
        )
    }

    @Transactional
    fun updateDishWeight(dishSerialNum: String, dishWeight: Double): ResultDto<Boolean> {
        val dish = getDishBySerialNum(dishSerialNum)
        dish.updateDishWeight(dishWeight)

        val dishWeightLog = DishWeightLogEntity(
            dish = dish,
            dishWeight = dishWeight,
        )

        dishWeightLogRepository.save(dishWeightLog)

        return ResultDto(
            data = true,
        )
    }

    @Transactional
    fun deleteDish(dishId: Long): ResultDto<Boolean> {
        val dish = getDishById(dishId)
        dish.delete()
        dishRepository.save(dish)
        //TODO : save 과정에서 문제가 발생했을 때 false 를 반환해야 함, Transaction 공부해보기

        return ResultDto(
            data = true,
        )
    }

    @Transactional
    fun modifyDishCatCount(catCountRequestDto: CatCountRequestDto): ResultDto<Boolean> {
        val dish = getDishBySerialNum(catCountRequestDto.dishSerialNum)

        dish.updateCatCount(catCountRequestDto.catCount, catCountRequestDto.tnrCount)
        dishRepository.save(dish)

        return ResultDto(
            data = true,
        )
    }

    private fun getDishById(dishId: Long): DishEntity {
        return dishQuerydslRepository.getDishById(dishId) ?: throw CustomException(ErrorCode.NOT_FOUND_DISH)
    }

    private fun getDishBySerialNum(dishSerialNum: String): DishEntity {
        return dishQuerydslRepository.getDishBySerialNum(dishSerialNum) ?: throw CustomException(ErrorCode.NOT_FOUND_DISH)
    }

}