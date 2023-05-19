package com.nyang.ourkitty.domain.management.repository

import com.nyang.ourkitty.entity.ManagementImageEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ManagementImageRepository : JpaRepository<ManagementImageEntity, Long> {
}
