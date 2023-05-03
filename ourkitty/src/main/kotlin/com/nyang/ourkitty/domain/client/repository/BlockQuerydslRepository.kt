package com.nyang.ourkitty.domain.client.repository

import com.nyang.ourkitty.entity.BlockEntity
import com.nyang.ourkitty.entity.QBlockEntity.blockEntity
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
class BlockQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {

    fun getUnblockList(now: LocalDateTime): List<BlockEntity> {
        return queryFactory.select(blockEntity)
            .from(blockEntity)
            .where(
                blockEntity.unBlockDate.before(now)
            )
            .fetch()
    }

}