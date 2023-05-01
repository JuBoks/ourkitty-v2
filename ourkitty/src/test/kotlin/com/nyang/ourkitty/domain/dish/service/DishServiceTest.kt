package com.nyang.ourkitty.domain.dish.service


import com.nyang.ourkitty.domain.dish.DishService
import com.nyang.ourkitty.domain.dish.repository.DishQuerydslRepository
import com.nyang.ourkitty.domain.dish.repository.DishRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
class DishServiceTest @Autowired constructor(
    private val dishRepository: DishRepository,
    private val dishQuerydslRepository: DishQuerydslRepository,
    private val dishService: DishService,
) {

    @Transactional
    @Test
    fun `냥그릇을 조회 및 반환`() {
        // given

        // when
        val result = dishService.getDishList(
            locationCode = "0020002",
        )

        // then
        println(result.data.size)
        println(result.centerLat)
        println(result.centerLong)
    }

    @Transactional
    @Test
    fun `dish 랑 savedDish 는 같은가`() {
        // given
    }

}