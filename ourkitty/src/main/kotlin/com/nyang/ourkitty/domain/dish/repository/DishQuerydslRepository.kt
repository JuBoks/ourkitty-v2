package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.common.dto.PositionDto
import com.nyang.ourkitty.domain.dish.dto.DishListResultDto
import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import com.nyang.ourkitty.entity.ClientDishEntity
import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.entity.QClientDishEntity.clientDishEntity
import com.nyang.ourkitty.entity.QDishEntity.dishEntity
import com.querydsl.core.types.Projections
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

@Repository
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
                dishEntity.isDeleted.isFalse,
                locationCode?.let { dishEntity.locationCode.eq(locationCode) },
            )
            .fetchOne()!!
    }

    fun getMyDishList(clientId: Long): DishListResultDto {
        val dishList = queryFactory.selectFrom(clientDishEntity)
            .leftJoin(clientDishEntity.dish).fetchJoin()
            .where(
                clientDishEntity.client.clientId.eq(clientId),
            )
            .fetch()
            .map { it.dish }

        return DishListResultDto(
            data = dishList.map(DishResponseDto::of),
            centerLat = dishList.map { it.dishLat }.average(),
            centerLong = dishList.map { it.dishLong }.average(),
        )
    }

    fun getDishById(dishId: Long): DishEntity? {
        return queryFactory
            .selectFrom(dishEntity)
            .where(
                dishEntity.isDeleted.isFalse,
                dishEntity.dishId.eq(dishId),
            )
            .fetchOne()
    }

    fun getDishBySerialNum(dishSerialNum: String): DishEntity? {
        return queryFactory
            .selectFrom(dishEntity)
            .where(
                dishEntity.isDeleted.isFalse,
                dishEntity.dishSerialNum.eq(dishSerialNum),
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