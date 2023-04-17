package com.nyang.ourkitty.entity

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
    val userCode: String,
    val locationCode: String,
) : BaseEntity() {
}