package com.nyang.ourkitty.domain.management.repository

import com.nyang.ourkitty.entity.ManagementEntity
import com.nyang.ourkitty.entity.QManagementEntity.managementEntity
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

//@Component
@Repository
class ManagementQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {

    fun getManagementList(locationCode: String, limit: Long, offset: Long, dishId: Long?): List<ManagementEntity> {
        return queryFactory
            .selectFrom(managementEntity)
            .leftJoin(managementEntity.dish).fetchJoin()
            .leftJoin(managementEntity.client).fetchJoin()
            .where(
                managementEntity.locationCode.eq(locationCode),
                dishId?.let { managementEntity.dish.dishId.eq(dishId) },
            )
            .limit(limit)
            .offset(offset)
            .fetch()
    }

    fun countManagementList(locationCode: String, dishId: Long?): Long {
        return queryFactory.select(managementEntity.managementId.count())
            .from(managementEntity)
            .leftJoin(managementEntity.dish)
            .where(
                managementEntity.locationCode.eq(locationCode),
                dishId?.let { managementEntity.dish.dishId.eq(dishId) },
            )
            .fetchOne() ?: 0L
    }

}