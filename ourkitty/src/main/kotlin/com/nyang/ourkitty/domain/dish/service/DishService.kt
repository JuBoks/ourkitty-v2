package com.nyang.ourkitty.domain.dish.service

import com.nyang.ourkitty.domain.dish.dto.DishRequestDto
import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import com.nyang.ourkitty.domain.dish.repository.DishRepository
import com.nyang.ourkitty.entity.DishEntity
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class DishService(
    private val dishRepository: DishRepository
) {

    fun getDishList(): List<DishResponseDto> {
        val dishList = dishRepository.findAll()

        return dishList.map { DishResponseDto(it) }
    }

    @Transactional
    fun createDish(dishRequestDto: DishRequestDto): DishResponseDto {
        val dish = dishRequestDto.toEntity()

        return DishResponseDto(dishRepository.save(dish))
    }

    fun getDish(dishId: Long): DishResponseDto? {
        val dish: DishEntity? = dishRepository.findByIdOrNull(dishId)

        return dish?.let { DishResponseDto(it) }
        // dishRepository.findByIdOrNull(dishId)?.let { } ?: throw Exception
    }

    @Transactional
    fun modifyDish(dishId: Long, dishRequestDto: DishRequestDto): DishResponseDto {
        val dish: DishEntity = dishRepository.findByIdOrNull(dishId)!!
        val updateParam = dishRequestDto.toEntity()

        return DishResponseDto(dishRepository.save(dish.modify(updateParam)))
    }

    @Transactional
    fun deleteDish(dishId: Long): Boolean {
        val dish: DishEntity = dishRepository.findByIdOrNull(dishId)!!
        dishRepository.save(dish.delete())
        //TODO : save 과정에서 문제가 발생했을 때 false 를 반환해야 함, Transaction 공부해보기
        return true
    }

}