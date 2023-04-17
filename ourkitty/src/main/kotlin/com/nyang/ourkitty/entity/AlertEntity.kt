package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "alert_table")
class AlertEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val alertId: Long? = null,

    val alertCode: String,
    val alertContent: String,

//    @ManyToOne(fetch = FetchType.LAZY)
//    val managementId:

) {
}