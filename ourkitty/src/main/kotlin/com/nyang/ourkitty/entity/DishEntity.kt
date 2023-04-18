package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "dish_table")
class DishEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dishId: Long? = null,

    val dishName: String = "",
    val dishProfileImagePath: String = "",
    val dishLat: Double = 0.0,
    val dishLong: Double = 0.0,
    val dishAddress: String = "",
    val locationCode: String = "",
    val dishSerialNum: String = "",
    val dishWeight: Double = 0.0,
    val dishCatCount: Int = 0,
    val dishTNRCount: Int = 0,
) : BaseEntity() {
}
