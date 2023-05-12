package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishCountLogEntity
import com.nyang.ourkitty.entity.DishEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface DishCountLogRepository : JpaRepository<DishCountLogEntity, Long> {

    fun findByDishAndDate(dish: DishEntity, date: LocalDate): DishCountLogEntity?

}