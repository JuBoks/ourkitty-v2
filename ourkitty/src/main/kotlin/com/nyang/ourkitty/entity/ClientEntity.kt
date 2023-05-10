package com.nyang.ourkitty.entity

import com.nyang.ourkitty.common.UserCode
import com.nyang.ourkitty.common.UserState
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
    var lastPostingDate: LocalDateTime = LocalDateTime.MIN,
    var userState: String = UserState.정상.code,
    var clientDescription: String = "",
) : BaseEntity() {

    fun updateLocationCode(locationCode: String) {
        this.locationCode = locationCode
    }

    fun updateProfileImage(imagePath: String) {
        this.clientProfileImagePath = imagePath
    }

    fun updateLastPostingDate() {
        this.lastPostingDate = LocalDateTime.now()
    }

    fun updatePhone(phone: String) {
        this.clientPhone = phone
    }

    fun updatePassword(newPassword: String) {
        this.clientPassword = newPassword
    }

    fun updateMyAccount(param: ClientEntity) {
        this.clientNickname = param.clientNickname
        this.clientAddress = param.clientAddress
        if (param.clientPassword != "") this.clientPassword = param.clientPassword
    }

    fun updateAccount(param: ClientEntity) {
        this.clientEmail = param.clientEmail
        this.clientName = param.clientName
        this.clientNickname = param.clientNickname
        this.clientAddress = param.clientAddress
        this.clientPhone = param.clientPhone
        if (param.clientPassword != "") this.clientPassword = param.clientPassword
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
        this.userState = UserState.탈퇴.code
    }

    fun cancelDelete() {
        this.clientDescription = ""
        this.clientNickname = this.clientName
        this.userState = UserState.정상.code
    }

    fun activate() {
        this.clientDescription = ""
        this.userState = UserState.정상.code
    }

    fun deactivate(clientDescription: String) {
        this.clientDescription = clientDescription
        this.userState = UserState.비활성화.code
    }

}