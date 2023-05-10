package com.nyang.ourkitty.domain.chart.repository

import com.nyang.ourkitty.domain.chart.dto.DishCountResponseDto
import com.nyang.ourkitty.entity.DishImageEntity
import com.nyang.ourkitty.entity.QDishImageEntity.dishImageEntity
import com.nyang.ourkitty.entity.QDishTotalLogEntity.dishTotalLogEntity
import com.querydsl.core.group.GroupBy.groupBy
import com.querydsl.core.group.GroupBy.list
import com.querydsl.core.types.Projections
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import java.time.LocalDate
import java.time.LocalDateTime

@Repository
class ChartQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {


    fun getVisitCountHeatMapData(dishId: Long): Map<Int, List<DishImageEntity>> {
        val now = LocalDate.now()
        val start = now.minusDays(6).atStartOfDay()

//        queryFactory.select(
//            dishImageEntity.createdDate.hour(),
//            dishImageEntity.createdDate.dayOfMonth(),
//            dishImageEntity.dishImageId.count(),
//        )
        return queryFactory
            .from(dishImageEntity)
            .where(
                dishImageEntity.createdDate.between(start, LocalDateTime.now())
            )
            .transform(
                groupBy(dishImageEntity.createdDate.hour()).`as`(list(dishImageEntity))
            )
//            .groupBy(
//                dishImageEntity.createdDate.hour(),
//                dishImageEntity.createdDate.dayOfMonth(),
//            )
//            .fetch()
    }

    fun getCatCountData(dishId: Long): List<DishCountResponseDto> {
        return queryFactory.select(
            Projections.constructor(
                DishCountResponseDto::class.java,
                dishTotalLogEntity.date.dayOfMonth(),
                dishTotalLogEntity.batteryAmount,
                dishTotalLogEntity.foodAmount,
                dishTotalLogEntity.catCount,
                dishTotalLogEntity.catCount.subtract(dishTotalLogEntity.tnrCount),
            )
        )
            .from(dishTotalLogEntity)
            .where(
                dishTotalLogEntity.dish.dishId.eq(dishId),
                dishTotalLogEntity.date.between(LocalDate.now().minusDays(7), LocalDate.now())
            )
            .orderBy(dishTotalLogEntity.date.asc())
            .fetch()
    }

}