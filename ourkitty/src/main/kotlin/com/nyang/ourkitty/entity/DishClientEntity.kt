package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "dish_client_table")
class DishClientEntity(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    val client: ClientEntity,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dishClientId: Long? = null,
) : BaseEntity() {
}