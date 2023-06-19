package com.meyou.app.network_API.User

import com.meyou.app.user.ModifyResponse
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.PUT


interface UserProfileModifyService {
    @PUT("client/mypage")
    fun modifyProfile(
       @Body body: RequestBody
    ): Call<ModifyResponse>
}