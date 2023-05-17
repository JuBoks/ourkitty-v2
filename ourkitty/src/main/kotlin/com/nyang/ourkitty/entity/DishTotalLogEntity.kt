package com.nyang.ourkitty.entity

import com.nyang.ourkitty.common.BatteryState
import com.nyang.ourkitty.common.DishWeight
import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "dish_total_log_table")
class DishTotalLogEntity(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dishTotalLogId: Long? = null,
    val date: LocalDate = LocalDate.now()
) : BaseEntity() {
    val batteryAmount: Int = BatteryState.values().first { it.code == dish.dishBatteryState }.amount
    val foodAmount: Int = DishWeight.values().first { it.code == dish.dishWeight }.amount
    var catCount: Int = dish.dishCatCount
    var tnrCount: Int = dish.dishTnrCount

    fun updateCount(catCount: Int, tnrCount: Int) {
        this.catCount = catCount
        this.tnrCount = tnrCount
    }

}