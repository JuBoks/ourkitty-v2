package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.common.dto.PositionDto
import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.entity.QDishEntity.dishEntity
import com.querydsl.core.types.Projections
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
                dishEntity.isDeleted.isFalse,
                locationCode?.let { dishEntity.locationCode.eq(locationCode) },
            )
            .fetch()
    }

    fun getCenterPos(locationCode: String?): PositionDto {
        return queryFactory.select(
            Projections.constructor(
                PositionDto::class.java,
                dishEntity.dishLat.avg(),
                dishEntity.dishLong.avg(),
            )
        )
            .from(dishEntity)
            .where(
                locationCode?.let { dishEntity.locationCode.eq(locationCode) },
            )
            .fetchOne()!!
    }

    fun getDishById(dishId: Long): DishEntity? {
        return queryFactory
            .selectFrom(dishEntity)
            .where(
                dishEntity.dishId.eq(dishId),
                dishEntity.isDeleted.isFalse,
            )
            .fetchOne()
    }

    fun getDishBySerialNum(dishSerialNum: String): DishEntity? {
        return queryFactory
            .selectFrom(dishEntity)
            .where(
                dishEntity.dishSerialNum.eq(dishSerialNum),
                dishEntity.isDeleted.isFalse,
            )
            .fetchOne()
    }

//    fun countDishList(locationCode: String): Int {
//        return queryFactory.select(dishEntity.dishId.count())
//            .from(dishEntity)
//            .where(
//                dishEntity.locationCode.eq(locationCode)
//            )
//            .fetchOne()?.toInt() ?: 0
//    }

}