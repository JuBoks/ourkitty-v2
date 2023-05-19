package com.nyang.ourkitty.domain.dish.repository


import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class DishQuerydslRepositoryTest @Autowired constructor(
    private val dishQuerydslRepository: DishQuerydslRepository,
) {

    @Test
    fun `return center position`() {
        val result = dishQuerydslRepository.getCenterPos("0020001")

        println(result)
    }

}