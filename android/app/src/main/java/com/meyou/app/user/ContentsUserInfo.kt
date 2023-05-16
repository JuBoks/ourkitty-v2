package com.meyou.app.user

data class ModifyResponse (
    val data: test,
    val totalCount: Int
        )
data class test (
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
data class Dish(
    val dishId: Int,
    val dishName: String
)
data class ContentsUserInfo (
    val data:Data,
    val totalCount:Int,
)

data class ResultData(
    val data: Boolean,
    val totalCount: Int
)
data class ResultImage(
    val data: String,
    val totalCount: Int
)