package com.meyou.app.network

import com.meyou.app.network.Dish.DetailDishGetService
import com.meyou.app.network.Dish.DishListGetService
import com.meyou.app.network.Login.LoginApiService
import com.meyou.app.network.Login.LoginGetToken
import com.meyou.app.network.User.UserDeleteService
import com.meyou.app.network.User.UserListGetService
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.create


class RetrofitInstance(private val accessToken: String = "") {

    private val BASE_URL = "https://k8e203.p.ssafy.io/api/"

    private val client = OkHttpClient.Builder()
        .addInterceptor { chain ->
            val newRequest = chain.request().newBuilder()
                .addHeader("Authorization", "Bearer ${accessToken}")
                .build()
            chain.proceed(newRequest)
        }
        .build()
    // 헤더에 토큰을 넣어야 되는 API
    private val retrofit = Retrofit.Builder()
        .client(client)
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    // 헤더에 토큰을 않넣어도 되는 API
    private val retrofitWithoutToken = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    fun getPhoneCheckApi(): LoginApiService {
        return retrofitWithoutToken.create(LoginApiService::class.java)
    }

    fun getUserToken(): LoginGetToken {
        return retrofitWithoutToken.create(LoginGetToken::class.java)
    }

    fun getDishList(): DishListGetService {
        return retrofit.create(DishListGetService::class.java)
    }
    fun getDetailDish(): DetailDishGetService {
        return retrofit.create(DetailDishGetService::class.java)
    }

    fun getUserList(): UserListGetService {
        return retrofit.create(UserListGetService::class.java)
    }

    fun deleteUser(): UserDeleteService {
        return retrofit.create(UserDeleteService::class.java)
    }

}

