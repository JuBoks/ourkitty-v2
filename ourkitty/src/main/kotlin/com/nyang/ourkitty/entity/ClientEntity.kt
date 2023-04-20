package com.nyang.ourkitty.entity

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "client_table")
class ClientEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val clientId: Long? = null,

    val clientEmail: String,
    val clientPassword: String,
    val clientName: String,
    val clientNickname: String,
    val clientProfileImagePath: String,
    val clientAddress: String,
    val clientPhone: String,
    val userCode: String = "0010001",
    val locationCode: String,
    val lastPostingDate: LocalDateTime = LocalDateTime.of(1970, 1, 1, 0, 0, 0),
) : BaseEntity() {

    //TODO : updateDish or addDish -> DishClientEntity 생성하는 로직

}