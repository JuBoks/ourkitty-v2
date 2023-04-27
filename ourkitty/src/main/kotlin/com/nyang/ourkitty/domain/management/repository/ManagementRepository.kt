package com.nyang.ourkitty.domain.management.repository

import com.nyang.ourkitty.entity.ManagementEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ManagementRepository : JpaRepository<ManagementEntity, Long> {
//    fun findAllByLocationCode(locationCode: String, pageable: Pageable): Page<ManagementEntity>
//    fun findAllByLocationCodeAndDish_DishId(locationCode: String, id: Long, pageable: Pageable): Page<ManagementEntity>
}