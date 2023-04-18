package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "dish_table")
class DishEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dishId: Long? = null,

    val dishName: String,
    val dishProfileImagePath: String,
    val dishLat: Double,
    val dishLong: Double,
    val dishAddress: String,
    val locationCoda: String,
    val dishSerialNum: String,
    val dishWeight: Double,
    val dishCatCount: Int,
    val dishTNRCount: Int,
) : BaseEntity() {

}
