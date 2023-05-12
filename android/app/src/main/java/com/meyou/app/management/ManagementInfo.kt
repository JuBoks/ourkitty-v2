package com.meyou.app.management

data class ManagementInfo(
    val imageUrls : List<String>? = null,
    val date : String = "",
    val userName : String = "",
    val userProfileImage : String = "",
    val userAddress : String = "",
    val text : String = "",
    val managementId : Int = 0,
    val isEdit : Boolean
)
data class DetailManagementInfo(
    val imageUrls: List<String>,
    val userName: String,
    val userProfileImage: String,
    val location: String,
    val message: String,
    val comments: List<UserComment>
)

data class UserComment(
    val userProfileImage: String,
    val userName: String,
    val comment: String,
    val date: String
)