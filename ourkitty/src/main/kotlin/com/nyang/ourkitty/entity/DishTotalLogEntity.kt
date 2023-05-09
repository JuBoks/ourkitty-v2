package com.nyang.ourkitty.entity

import com.nyang.ourkitty.common.BatteryState
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
) : BaseEntity() {
    val date: LocalDate = LocalDate.now()
    val batteryAmount: Int = BatteryState.values().first { it.code == dish.dishBatteryState }.amount
    val foodAmount: Double = dish.dishWeight
    val catCount: Int = dish.dishCatCount
    val tnrCount: Int = dish.dishTnrCount

}