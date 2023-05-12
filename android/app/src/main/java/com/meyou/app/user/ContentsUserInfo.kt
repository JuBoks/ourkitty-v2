package com.meyou.app.user

data class Data (
    val clientAddress: String,
    val clientDescription: String,
    val clientEmail: String,
    val clientId: Int,
    val clientName: String,
    val clientNickname: String,
    val clientPhone: String,
    val clientProfileImagePath: String,
    val createdDate: String,
    val dishList: List<Dish>,
    val isDeleted: Boolean,
    val lastPostingDate: String,
    val locationCode: String,
    val updatedDate: String,
    val userCode: String,
    val userState: String
        )
data class ContentsUserInfo (
    val data:Data,
    val totalCount:Int,
)
data class Dish(
    val dishId: Int,
    val dishName: String
)
data class DeleteRequest(
    val data: Boolean,
    val totalCount: Int
)