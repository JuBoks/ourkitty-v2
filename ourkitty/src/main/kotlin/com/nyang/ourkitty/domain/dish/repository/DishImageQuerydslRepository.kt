package com.nyang.ourkitty.domain.dish.repository

import com.nyang.ourkitty.entity.DishImageEntity
import com.nyang.ourkitty.entity.QDishImageEntity.dishImageEntity
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
class DishImageQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {

    fun getDishImageList(dishSerialNum: String, date: LocalDate): List<DishImageEntity> {
        return queryFactory.selectFrom(dishImageEntity)
            .where(
                dishImageEntity.dish.dishSerialNum.eq(dishSerialNum),
                dishImageEntity.createdDate.between(date.atStartOfDay(), date.plusDays(1).atStartOfDay()),
            )
            .fetch()
    }

    fun getVisitCatList(dishId: Long): List<DishImageEntity> {
        return queryFactory.selectFrom(dishImageEntity)
            .where(
                dishImageEntity.dish.dishId.eq(dishId),
            )
            .orderBy(dishImageEntity.createdDate.desc())
            .limit(20)
            .fetch()
    }

}