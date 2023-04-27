package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "dish_table")
class DishEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val dishId: Long? = null,

    var dishName: String = "",
    //TODO : default 이미지 환경변수 처리 (url)
    var dishProfileImagePath: String = "default.png",
    var dishLat: Double = 0.0,
    var dishLong: Double = 0.0,
    var dishAddress: String = "",
    var locationCode: String = "",
    val dishSerialNum: String = "",
    var dishWeight: Double = 0.0,
    var dishCatCount: Int = 0,
    var dishTnrCount: Int = 0,
) : BaseEntity() {

    fun setProfileImage(imagePath: String) {
        this.dishProfileImagePath = imagePath
    }

    fun setDishLocationCode(locationCode: String) {
        this.locationCode = locationCode
    }

    fun modify(param: DishEntity): DishEntity {
        this.dishName = param.dishName
        this.dishLat = param.dishLat
        this.dishLong = param.dishLong
        this.dishAddress = param.dishAddress
        this.locationCode = param.locationCode

        return this
    }

    fun update(param: DishEntity): DishEntity {
        this.dishWeight = param.dishWeight
        this.dishCatCount = param.dishCatCount
        this.dishTnrCount = param.dishTnrCount

        return this
    }

    fun delete(): DishEntity {
        this.isDeleted = true
        //TODO : 연관된 Entity 들에 대한 처리 필요

        return this
    }
}
