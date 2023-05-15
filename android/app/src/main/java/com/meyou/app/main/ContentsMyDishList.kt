package com.meyou.app.main

import ted.gun0912.clustering.clustering.TedClusterItem
import ted.gun0912.clustering.geometry.TedLatLng
import java.io.Serializable

data class ContentsMyDishList(
    val data: List<Dish>,
    val centerLat: Double,
    val centerLong: Double
)
data class ContentsDetailDishList(
    val data: Dish,
    val totalCount: Int,
)
data class Dish(
    val dishId: Int,
    val dishName: String,
    val dishProfileImagePath: String,
    val dishLat: Double,
    val dishLong: Double,
    val dishAddress: String,
    val locationCode: String,
    val dishSerialNum: String,
    val dishWeight: Int,
    val dishBatteryState: Int,
    val dishCatCount: Int,
    val dishTnrCount: Int,
    val isDeleted: Boolean,
    val createdDate: String,
    val updatedDate: String
):Serializable, TedClusterItem {
    override fun getTedLatLng(): TedLatLng {
        return TedLatLng(dishLat, dishLong)
    }
}
