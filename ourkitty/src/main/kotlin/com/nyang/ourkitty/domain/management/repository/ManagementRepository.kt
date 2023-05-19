package com.nyang.ourkitty.domain.management.repository

import com.nyang.ourkitty.entity.ManagementEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ManagementRepository : JpaRepository<ManagementEntity, Long> {
}