package com.nyang.ourkitty.domain.chart.repository

import com.nyang.ourkitty.domain.chart.dto.DishCountResponseDto
import com.nyang.ourkitty.entity.DishImageEntity
import com.nyang.ourkitty.entity.QDishCountLogEntity.dishCountLogEntity
import com.nyang.ourkitty.entity.QDishImageEntity.dishImageEntity
import com.querydsl.core.group.GroupBy.groupBy
import com.querydsl.core.group.GroupBy.list
import com.querydsl.core.types.Projections
import com.querydsl.core.types.dsl.Expressions
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
        println("now $now")
        val start = now.minusDays(7).atStartOfDay()
        println("start $start")

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

    fun getDishWeightHeatMapData() {
        queryFactory.select(dishImageEntity.dishImageId.coalesce(123L).`as`("ㄷㅊ라"))

        TODO()
    }

    fun getCatCountData(dishId: Long): List<DishCountResponseDto> {
        return queryFactory.select(
            Projections.constructor(
                DishCountResponseDto::class.java,
                dishCountLogEntity.date,
                dishCountLogEntity.dishCatCount.sum(),
                dishCountLogEntity.dishTnrCount.sum(),
            )
        )
            .from(dishCountLogEntity)
            .where(
                dishCountLogEntity.dish.dishId.eq(dishId),
                dishCountLogEntity.date.after(LocalDate.now().minusWeeks(1))
            )
            .groupBy(dishCountLogEntity.date)
            .orderBy(dishCountLogEntity.date.asc())
            .fetch()
    }

}