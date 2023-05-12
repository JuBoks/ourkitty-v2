package com.nyang.ourkitty.domain.client.repository

import com.nyang.ourkitty.entity.BlockEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BlockRepository : JpaRepository<BlockEntity, Long> {
    fun findByClientId(clientId: Long): BlockEntity?

}