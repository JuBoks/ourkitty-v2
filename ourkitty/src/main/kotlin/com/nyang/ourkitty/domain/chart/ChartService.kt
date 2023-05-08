package com.nyang.ourkitty.domain.chart

import com.nyang.ourkitty.domain.chart.dto.DishCountResultDto
import com.nyang.ourkitty.domain.chart.repository.ChartQuerydslRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

@Service
@Transactional(readOnly = true)
class ChartService(
    private val chartQuerydslRepository: ChartQuerydslRepository,
) {

    fun getCatVisitData(dishId: Long) {
        val data = chartQuerydslRepository.getVisitCountHeatMapData(dishId)

        println(data)
    }

    fun getCatCountData(dishId: Long): DishCountResultDto {
        val data = chartQuerydslRepository.getCatCountData(dishId)

        val catCountList: MutableList<Int> = MutableList(7) { 0 }
        val tnrCountList: MutableList<Int> = MutableList(7) { 0 }

        for (x in 6L downTo 0) {
            val day = LocalDate.now().minusDays(x)
            data.firstOrNull { it.date == day }.let {
                catCountList[(6 - x).toInt()] = it?.catCount ?: 0
                tnrCountList[(6 - x).toInt()] = it?.tnrCount ?: 0
            }
        }

        return DishCountResultDto(
            catCountList = catCountList,
            tnrCountList = tnrCountList,
        )
    }
}