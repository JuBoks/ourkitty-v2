package com.nyang.ourkitty.entity

import com.nyang.ourkitty.common.UserCode
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "client_table")
class ClientEntity(
    @Column(unique = true)
    var clientEmail: String,
    var clientPassword: String,
    var clientName: String,
    var clientNickname: String,
    var clientAddress: String,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val clientId: Long? = null,

    @OneToMany(mappedBy = "client", cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    val dishList: MutableList<ClientDishEntity> = mutableListOf(),

    val userCode: String = UserCode.캣맘.code,
    var clientProfileImagePath: String = "",
    var locationCode: String = "",
    var clientPhone: String = "",
    val lastPostingDate: LocalDateTime = LocalDateTime.of(2000, 1, 1, 0, 0, 0),
    var isActive: Boolean = true,
    var clientDescription: String = "",
) : BaseEntity() {

    //TODO : updateDish or addDish -> DishClientEntity 생성하는 로직
    fun updateLocationCode(locationCode: String) {
        this.locationCode = locationCode
    }

    fun updateProfileImage(imagePath: String) {
        this.clientProfileImagePath = imagePath
    }

    fun updatePhone(phone: String) {
        this.clientPhone = phone
    }

    fun updateMyAccount(param: ClientEntity) {
        this.clientPassword = param.clientPassword
        this.clientNickname = param.clientNickname
        this.clientAddress = param.clientAddress
    }

    fun updateAccount(param: ClientEntity) {
        this.clientEmail = param.clientEmail
        this.clientPassword = param.clientPassword
        this.clientName = param.clientName
        this.clientNickname = param.clientNickname
        this.clientAddress = param.clientAddress
    }

    fun deleteDish(clientDish: ClientDishEntity) {
        this.dishList.remove(clientDish)
    }

    fun addDish(clientDish: ClientDishEntity) {
        this.dishList.add(clientDish)
    }

    fun delete(clientDescription: String) {
        this.clientDescription = clientDescription
        this.clientNickname = "삭제된 사용자"
        this.clientProfileImagePath = ""
        this.isDeleted = true
    }

    fun cancelDelete() {
        this.clientDescription = ""
        this.clientNickname = this.clientName
        this.isDeleted = false
    }

    fun activate() {
        this.clientDescription = ""
        this.isActive = true
    }

    fun deactivate(clientDescription: String) {
        this.clientDescription = clientDescription
        this.isActive = false
    }

}