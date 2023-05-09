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