package com.meyou.app.network.management

import retrofit2.Call
import retrofit2.http.*

interface CreateManagementService {
    @FormUrlEncoded
    @POST("management")
    fun createManagement(
        @Field("dishId") dishId: Int?,
        @Field("dishState") dishState: String,
        @Field("files") files: List<String>,
        @Field("managementContent") managementContent: String
    ): Call<ManagementResponse>
}

interface ReadManagementService {
    @GET("management")
    fun readManagement(
        @Query("id") id: Int?,
        @Query("limit") limit: Int = 5000,
        @Query("offset") offset: Int = 0,
    ): Call<ManagementResponse>
}