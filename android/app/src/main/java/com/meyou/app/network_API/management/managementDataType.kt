package com.meyou.app.network_API.management

data class ManagementResponse(
    val data: List<Data>,
    val totalCount: Int
)
data class ManagementDetailResponse(
    val data: Data,
    val totalCount: Int
)
data class Data(
    val client: Client,
    val createdDate: String,
    val dish: Dish,
    val dishState: String,
    val isDeleted: Boolean,
    val managementCommentList: List<ManagementComment>,
    val managementContent: String,
    val managementId: Int,
    val managementImageList: List<ManagementImage>,
    val updatedDate: String
)

data class Client(
    val clientId: Int,
    val clientNickname: String,
    val clientProfileImagePath: String
)

data class Dish(
    val createdDate: String,
    val dishAddress: String,
    val dishBatteryState: Int,
    val dishCatCount: Int,
    val dishId: Int,
    val dishLat: Double,
    val dishLong: Double,
    val dishName: String,
    val dishProfileImagePath: String,
    val dishSerialNum: String,
    val dishTnrCount: Int,
    val dishWeight: Int,
    val isDeleted: Boolean,
    val locationCode: String,
    val updatedDate: String
)

data class ManagementComment(
    val client: Client,
    val createdDate: String,
    val isDeleted: Boolean,
    val managementCommentContent: String,
    val managementCommentId: Int,
    val updatedDate: String
)

data class ManagementImage(
    val createdDate: String,
    val imagePath: String,
    val isDeleted: Boolean,
    val managementImageId: Int,
    val updatedDate: String
)

data class UploadImageData (
    val data: String,
    val totalCount: Int
)