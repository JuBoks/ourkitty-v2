package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishEntity
import org.springframework.data.jpa.repository.JpaRepository

interface DishRepository : JpaRepository<DishEntity, Long> {

}