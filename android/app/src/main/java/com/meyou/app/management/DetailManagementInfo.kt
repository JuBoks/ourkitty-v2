package com.meyou.app.management

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