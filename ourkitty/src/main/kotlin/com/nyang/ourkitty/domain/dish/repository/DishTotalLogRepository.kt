package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishTotalLogEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DishTotalLogRepository : JpaRepository<DishTotalLogEntity, Long> {
}