package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "dish_image_table")
class DishImageEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dishImageId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    val filePath: String,
) : ImageEntity() {
}