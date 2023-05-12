package com.meyou.app.network.User

import com.meyou.app.user.ContentsUserInfo
import com.meyou.app.user.DeleteRequest
import retrofit2.Call
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Path

interface UserListGetService {
    @GET("client/mypage")
    fun getUserList(): Call<ContentsUserInfo>
}

interface UserDeleteService {
    @DELETE("client/{clientId}")
    fun deleteUser(@Path("clientId") clientId: Int): Call<DeleteRequest>
}