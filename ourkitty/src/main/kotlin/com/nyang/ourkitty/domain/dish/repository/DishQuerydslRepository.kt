package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.entity.QDishEntity.dishEntity
import com.querydsl.core.Tuple
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Component

@Component
class DishQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {

    fun getDishList(locationCode: String? = null): List<DishEntity> {
        return queryFactory.select(dishEntity)
            .from(dishEntity)
            .where(
                locationCode?.let { dishEntity.locationCode.eq(locationCode) },
            )
            .fetch()
    }

    fun getCenterPos(locationCode: String?): Pair<Double, Double> {
        val result: Tuple? = queryFactory.select(dishEntity.dishLat.avg(), dishEntity.dishLong.avg())
            .from(dishEntity)
            .where(
                locationCode?.let { dishEntity.locationCode.eq(locationCode) },
            )
            .fetchOne()

        return if (result == null) {
            Pair(0.0, 0.0)
        } else {
            Pair(result.get(dishEntity.dishLat.avg())!!, result.get(dishEntity.dishLong.avg())!!)
        }
    }

    fun countDishList(locationCode: String): Int {
        return queryFactory.select(dishEntity.dishId.count())
            .from(dishEntity)
            .where(
                dishEntity.locationCode.eq(locationCode)
            )
            .fetchOne()?.toInt() ?: 0
    }

}