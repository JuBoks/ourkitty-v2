package com.nyang.ourkitty.domain.chart.repository

import com.nyang.ourkitty.domain.chart.dto.DishCountResponseDto
import com.nyang.ourkitty.entity.QDishCountLogEntity.dishCountLogEntity
import com.nyang.ourkitty.entity.QDishImageEntity.dishImageEntity
import com.querydsl.core.types.Projections
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
class ChartQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {


    fun getVisitCountHeatMapData(dishId: Long): List<Long> {
        return queryFactory.select(dishImageEntity.dishImageId.count())
            .from(dishImageEntity)
            .where(
                dishImageEntity.createdDate.after(LocalDate.now().minusWeeks(1).atStartOfDay())
            )
            .groupBy(
                dishImageEntity.createdDate.hour()
            )
            .fetch()
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