package com.meyou.app.network.Dish

import com.meyou.app.main.ContentsDetailDishList
import retrofit2.Call
import com.meyou.app.main.ContentsMyDishList
import retrofit2.http.GET
import retrofit2.http.Path

interface DishListGetService {
    @GET("dish/mydish")
    fun getDishes(): Call<ContentsMyDishList>
}

interface DetailDishGetService {
    @GET("dish/{dishId}")
    fun getDetailDish(@Path("dishId") dishId: Int): Call<ContentsDetailDishList>
}