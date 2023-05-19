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
        val today = LocalDate.now().dayOfMonth
        val result: MutableList<MutableList<DishImageListResponseDto>> = MutableList(24) { MutableList(7) { DishImageListResponseDto() } }

        val data = chartQuerydslRepository.getVisitCountHeatMapData(dishId)

        for (x in 0..23) {
            val map = data[x]?.groupBy { it.createdDate.dayOfMonth } ?: continue
            for (y in (today - 7)..(today - 1)) {
                result[x][y - (today - 7)] = map[y]?.let { it ->
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
        val startDate = LocalDate.now().dayOfMonth - 7

        val batteryAmountList: MutableList<Int> = MutableList(7) { 0 }
        val foodAmountList: MutableList<Int> = MutableList(7) { 0 }
        val catCountList: MutableList<Int> = MutableList(7) { 0 }
        val noTnrCountList: MutableList<Int> = MutableList(7) { 0 }

        for (x in 0..6) {
            data.firstOrNull { it.date == startDate + x }.let {
                batteryAmountList[x] = it?.batteryAmount ?: 0
                foodAmountList[x] = it?.foodAmount ?: 0
                catCountList[x] = it?.catCount ?: 0
                noTnrCountList[x] = it?.noTnrCount ?: 0
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