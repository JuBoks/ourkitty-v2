package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.entity.DishTotalLogEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface DishTotalLogRepository : JpaRepository<DishTotalLogEntity, Long> {

    fun findByDishAndDate(dish: DishEntity, date: LocalDate): DishTotalLogEntity?
    
}