package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "dish_weight_log_table")
class DishWeightLogEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dishWeightLogId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    val dishWeight: Double,
) : BaseEntity() {
}