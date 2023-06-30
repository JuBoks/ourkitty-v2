package com.nyang.ourkitty.domain.chart

import com.nyang.ourkitty.domain.chart.dto.DishCountResultDto
import com.nyang.ourkitty.domain.chart.dto.DishImageListResponseDto
import com.nyang.ourkitty.domain.chart.repository.ChartQuerydslRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

@Service
@Transactional(readOnly = true)
class ChartService(
    private val chartQuerydslRepository: ChartQuerydslRepository,
) {

    fun getCatVisitData(dishId: Long): List<List<DishImageListResponseDto>> {
        val now = LocalDate.now()
        val dayList: List<Int> = (1..7).map { now.minusDays(it.toLong()).dayOfMonth }.reversed()
        val result: MutableList<MutableList<DishImageListResponseDto>> = MutableList(24) { MutableList(7) { DishImageListResponseDto() } }

        val data = chartQuerydslRepository.getVisitCountHeatMapData(dishId)

        for (x in 0..23) {
            val map = data[x]?.groupBy { it.createdDate.dayOfMonth } ?: continue
            for (y in dayList) {
                val index = dayList.indexOf(y)
                result[x][index] = map[y]?.let { it ->
                    DishImageListResponseDto(
                            size = it.size,
                            imageList = it.map { it.imagePath },
                    )
                } ?: DishImageListResponseDto()
            }
        }

        return result
    }

    fun getCatCountData(dishId: Long): DishCountResultDto {
        val data = chartQuerydslRepository.getCatCountData(dishId)
        val now = LocalDate.now()
        val dayList: List<Int> = (1..7).map { now.minusDays(it.toLong()).dayOfMonth }.reversed()

        val batteryAmountList: MutableList<Int> = MutableList(7) { 0 }
        val foodAmountList: MutableList<Int> = MutableList(7) { 0 }
        val catCountList: MutableList<Int> = MutableList(7) { 0 }
        val noTnrCountList: MutableList<Int> = MutableList(7) { 0 }

        for (x in dayList.indices) {
            val day = dayList[x]
            for (it in data) {
                if (it.date == day) {
                    batteryAmountList[x] = it?.batteryAmount ?: 0
                    foodAmountList[x] = it?.foodAmount ?: 0
                    catCountList[x] = it?.catCount ?: 0
                    noTnrCountList[x] = it?.noTnrCount ?: 0
                    break
                }
            }
        }

        return DishCountResultDto(
            batteryAmountList = batteryAmountList,
            foodAmountList = foodAmountList,
            catCountList = catCountList,
            noTnrCountList = noTnrCountList,
        )
    }

}