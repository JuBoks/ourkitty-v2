package com.nyang.ourkitty.domain.dish.service

import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.dish.dto.DishRequestDto
import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import com.nyang.ourkitty.domain.dish.repository.DishRepository
import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class DishService(
    private val dishRepository: DishRepository
) {

    fun getDishList(): ResultDto<List<DishResponseDto>> {
        val dishList = dishRepository.findAll()

        val dishResponseDtoList = dishList
            .filter { !it.isDeleted }
            .map { DishResponseDto(it) }

        return ResultDto(
            data = dishResponseDtoList,
            totalCount = dishResponseDtoList.size
        )
    }

    @Transactional
    fun createDish(dishRequestDto: DishRequestDto): ResultDto<DishResponseDto> {
        val dish = dishRequestDto.toEntity()
        //TODO : 중복검사

        return ResultDto(
            data = DishResponseDto(dishRepository.save(dish))
        )
    }

    fun getDish(dishId: Long): ResultDto<DishResponseDto> {
        val dish = getDishById(dishId)

        return ResultDto(
            data = DishResponseDto(dish)
        )
    }

    @Transactional
    fun modifyDish(dishId: Long, dishRequestDto: DishRequestDto): ResultDto<DishResponseDto> {
        val dish = getDishById(dishId)
        val updateParam = dishRequestDto.toEntity()

        return ResultDto(
            data = DishResponseDto(dishRepository.save(dish.modify(updateParam)))
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