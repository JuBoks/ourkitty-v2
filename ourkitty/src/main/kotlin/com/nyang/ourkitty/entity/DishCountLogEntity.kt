package com.nyang.ourkitty.entity

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "dish_count_log_table")
class DishCountLogEntity(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    val date: LocalDate,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dishCountLogId: Long? = null,
) : BaseEntity() {
    var dishCatCount: Int = dish.dishCatCount
    var dishTnrCount: Int = dish.dishTnrCount

    fun updateCount(catCount: Int, tnrCount: Int) {
        this.dishCatCount = catCount
        this.dishTnrCount = tnrCount
    }
    
}