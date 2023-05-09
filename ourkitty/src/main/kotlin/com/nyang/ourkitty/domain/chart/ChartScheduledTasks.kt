package com.nyang.ourkitty.domain.chart

import com.nyang.ourkitty.domain.dish.DishService
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class ChartScheduledTasks(
    private val dishService: DishService,
) {

    /**
     * 배터리, 냥그릇 무게 차트 생성을 위한 데이터 저장
     * 매일 밤 22:00:00 에 기록
     */
    @Scheduled(cron = "0 0 22 * * *")
    fun writeTotalLogEveryDay() {
        // |  dish_total_log_id  |  dish_id  |  date  |  battery_amount  |  weight(food)_amount  |  is_deleted  |  created_date  |  updated_date  |
        dishService.writeTotalLog()

    }

}