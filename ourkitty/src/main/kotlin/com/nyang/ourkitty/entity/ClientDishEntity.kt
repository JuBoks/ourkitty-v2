package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "client_dish_table")
class ClientDishEntity(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    val client: ClientEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val clientDishId: Long? = null,
) : BaseEntity() {
}