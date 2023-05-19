package com.meyou.app.network.Dish

import com.meyou.app.main.ContentsDetailDishList
import com.meyou.app.main.ContentsMyDishList
import com.meyou.app.main.DishDayPhotoData
import com.meyou.app.main.DishImagesResponse
import com.meyou.app.network.management.ManagementResponse
import retrofit2.Call
import com.meyou.app.user.ContentsUserInfo
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface DishListGetService {
    @GET("dish/mydish")
    fun getDishes(): Call<ContentsMyDishList>
}

interface DetailDishGetService {
    @GET("dish/{dishId}")
    fun getDetailDish(@Path("dishId") dishId: Int): Call<ContentsDetailDishList>
}
interface GetDishImageService {
    @GET("dish/{id}/image")
    fun getDishImage(@Path("id") id: Int): Call<DishImagesResponse>
}

interface DishAiApiService {
    @GET("representatives")
    fun readDishAiApiService(
        @Query("serial_number") serial_number: String
    ): Call<Map<String, List<String>>>
}
