package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishImageEntity
import org.springframework.data.jpa.repository.JpaRepository

interface DishImageRepository : JpaRepository<DishImageEntity, Long> {
}