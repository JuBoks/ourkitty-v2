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

    fun updateProfileImage(imagePath: String) {
        this.dishProfileImagePath = imagePath
    }

    fun updateLocationCode(locationCode: String) {
        this.locationCode = locationCode
    }

    fun updateDishWeight(dishWeight: Double) {
        this.dishWeight = dishWeight
    }

    fun updateCatCount(catCount: Int, tnrCount: Int) {
        this.dishCatCount = catCount
        this.dishTnrCount = tnrCount
    }

    fun update(param: DishEntity): DishEntity {
        this.dishName = param.dishName
        this.dishLat = param.dishLat
        this.dishLong = param.dishLong
        this.dishAddress = param.dishAddress
        this.locationCode = param.locationCode

        return this
    }

}
