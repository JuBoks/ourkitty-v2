package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishWeightLogEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DishWeightLogRepository : JpaRepository<DishWeightLogEntity, Long> {
}