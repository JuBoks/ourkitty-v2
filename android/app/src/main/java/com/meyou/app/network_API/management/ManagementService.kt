package com.meyou.app.network_API.management

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
    ): Call<ManagementDetailResponse>
}

interface ReadManagementService {
    @GET("management")
    fun readManagement(
        @Query("id") id: Int?,
        @Query("limit") limit: Int = 5000,
        @Query("offset") offset: Int = 0,
    ): Call<ManagementResponse>
}

interface ReadDetailManagementService {
    @GET("management/{managementId}")
    fun readDetailManagement(
        @Path("managementId") id: Int): Call<ManagementDetailResponse>
}

interface CreateManagementCommentService {
    @FormUrlEncoded
    @POST("management/{managementId}/comment")
    fun createCommentManagement(
        @Field("managementCommentContent") managementCommentContent: String,
        @Path("managementId") id: Int
    ): Call<ManagementDetailResponse>
}
interface DeleteManagementCommentService {
    @DELETE("management/{managementId}/comment/{managementCommentId}")
    fun deleteCommentManagement(
        @Path("managementId") managementId: Int,
        @Path("managementCommentId") managementCommentId: Int
    ): Call<UploadImageData>
}

interface DeleteManagementService {
    @DELETE("management/{managementId}")
    fun deleteManagement(
        @Path("managementId") managementId: Int,
    ): Call<UploadImageData>
}
