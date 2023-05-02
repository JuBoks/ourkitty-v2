package com.nyang.ourkitty.entity

import com.nyang.ourkitty.common.UserCode
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "client_table")
class ClientEntity(
    val clientEmail: String,
    val clientPassword: String,
    val clientName: String,
    val clientNickname: String,
    val clientProfileImagePath: String,
    val clientAddress: String,
    val clientPhone: String,
    val locationCode: String,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val clientId: Long? = null,

    @OneToMany(mappedBy = "client", cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    val dishList: MutableList<ClientDishEntity> = mutableListOf(),

    val userCode: String = UserCode.캣맘.code,
    val lastPostingDate: LocalDateTime = LocalDateTime.of(2000, 1, 1, 0, 0, 0),
) : BaseEntity() {

    //TODO : updateDish or addDish -> DishClientEntity 생성하는 로직

}