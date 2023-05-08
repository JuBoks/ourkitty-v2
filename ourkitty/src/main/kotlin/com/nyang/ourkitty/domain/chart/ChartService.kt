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
            for (y in today-7..today) {
                if ((y == today && x >= 15) ||
                    (y == today-7 && x < 15)) {
                    continue
                }
                // x + 9 가 24 이상일 때
                else if (x >= 15) {
                    result[x-15][y-today+7] = map[y]?.let { it ->
                        DishImageListResponseDto(
                            size = it.size,
                            imageList = it.map { it.imagePath }
                        )
                    } ?: DishImageListResponseDto()
                }
                // 그 외
                else {
                    result[x+9][y-today+6] = map[y]?.let { it ->
                        DishImageListResponseDto(
                            size = it.size,
                            imageList = it.map { it.imagePath }
                        )
                    } ?: DishImageListResponseDto()
                }
            }
        }

        return result
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