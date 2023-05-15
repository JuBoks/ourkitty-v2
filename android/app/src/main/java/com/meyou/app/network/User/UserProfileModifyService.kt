package com.meyou.app.network.User

import okhttp3.RequestBody
import retrofit2.http.Multipart
import retrofit2.http.PUT
import retrofit2.http.PartMap

interface UserProfileModifyService {
    @Multipart
    @PUT("client/mypage")
    fun modifyProfile(
        @PartMap data: HashMap<String, RequestBody>
    )

}