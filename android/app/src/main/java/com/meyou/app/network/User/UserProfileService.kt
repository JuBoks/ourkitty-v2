package com.meyou.app.network.User

import com.meyou.app.user.ResultImage
import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface UserProfileService {
    @Multipart
    @POST("upload/image")
    fun uploadSingleImage(
        @Part photo: MultipartBody.Part
    ): Call<ResultImage>
}