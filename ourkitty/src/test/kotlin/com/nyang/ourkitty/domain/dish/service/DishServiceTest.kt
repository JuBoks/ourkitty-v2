package com.nyang.ourkitty.domain.dish.service


import com.nyang.ourkitty.common.LocationCode
import com.nyang.ourkitty.domain.dish.repository.DishQuerydslRepository
import com.nyang.ourkitty.domain.dish.repository.DishRepository
import com.nyang.ourkitty.entity.DishEntity
import org.assertj.core.api.Assertions.assertThat
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
    fun `limit 와 offset 을 받아 냥그릇을 조회 및 반환`() {
        // given
        val locationCode = LocationCode.사하구.code
        val totalCount = dishQuerydslRepository.countByLocationCode(locationCode)
        val limit = 10L
        val offset: Long
        val expected: Int

        if (totalCount % 10 == 0) {
            offset = ((totalCount / 10 - 1) * 10).toLong()
            expected = 10
        } else {
            offset = (totalCount / 10 * 10).toLong()
            expected = totalCount % 10
        }

        // when
        val result = dishService.getDishList(
            locationCode = locationCode,
            limit = limit,
            offset = offset,
        )

        // then
        assertThat(result.data).hasSize(expected)
        assertThat(result.totalCount).isEqualTo(totalCount)
    }

    @Transactional
    @Test
    fun `dish 랑 savedDish 는 같은가`() {
        // given
        val dish = DishEntity()

        // when
        val savedDish = dishRepository.save(dish)

        // then
        assertThat(savedDish.dishId).isEqualTo(dish.dishId)
        assertThat(savedDish).isEqualTo(dish)
    }

}