package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.entity.QDishEntity.dishEntity
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Component

@Component
class DishQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {

    fun getDishListByLimitAndOffset(locationCode: String? = null, limit: Long? = 10L, offset: Long? = 0L): List<DishEntity> {
        return queryFactory.select(dishEntity)
            .from(dishEntity)
            .where(
                locationCode?.let { dishEntity.locationCode.eq(locationCode) },
            )
            .limit(limit!!)
            .offset(offset!!)
            .fetch()
    }

    fun countByLocationCode(locationCode: String): Int {
        return queryFactory.select(dishEntity.dishId.count())
            .from(dishEntity)
            .where(
                dishEntity.locationCode.eq(locationCode)
            )
            .fetchOne()?.toInt() ?: 0
    }

}