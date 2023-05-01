package com.nyang.ourkitty.domain.client.repository

import com.nyang.ourkitty.entity.ClientDishEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ClientDishRepository : JpaRepository<ClientDishEntity, Long> {
}