package com.meyou.app.network_API.management

import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface Uploadimage {
    @Multipart
    @POST("upload/image")
    fun image(
        @Part file: List<MultipartBody.Part>,
    ):Call<UploadImageData>

}