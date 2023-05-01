package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "dish_weight_log_table")
class DishWeightLogEntity(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    val dishWeight: Double,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dishWeightLogId: Long? = null,
) : BaseEntity() {
}