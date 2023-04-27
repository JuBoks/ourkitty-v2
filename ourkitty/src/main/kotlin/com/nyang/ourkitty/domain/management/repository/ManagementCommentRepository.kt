package com.nyang.ourkitty.domain.management.repository

import com.nyang.ourkitty.entity.ManagementCommentEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ManagementCommentRepository : JpaRepository<ManagementCommentEntity, Long> {
}