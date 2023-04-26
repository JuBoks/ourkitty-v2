package com.nyang.ourkitty.entity

import com.nyang.ourkitty.common.LocationCode
import com.nyang.ourkitty.common.UserCode
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
    val userCode: UserCode = UserCode.캣맘,
    val locationCode: LocationCode,
    val lastPostingDate: LocalDateTime = LocalDateTime.of(1970, 1, 1, 0, 0, 0),
) : BaseEntity() {

    //TODO : updateDish or addDish -> DishClientEntity 생성하는 로직

}