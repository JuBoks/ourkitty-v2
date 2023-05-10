package com.meyou.app.network.Dish

import retrofit2.Call
import com.meyou.app.main.ContentsMyDishList
import retrofit2.http.GET

interface DishListGetService {
    @GET("dish")
    fun getDishes(): Call<ContentsMyDishList>
}