package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DishRepository : JpaRepository<DishEntity, Long> {

    fun existsByDishSerialNum(dishSerialNum: String): Boolean

}