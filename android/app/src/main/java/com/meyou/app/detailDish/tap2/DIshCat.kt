package com.meyou.app.detailDish.tap2

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.meyou.app.R
import com.meyou.app.detailDish.tap1.DetailActivity
import com.meyou.app.detailDish.tap3.VisiteCatActivity
import com.meyou.app.main.DishDayPhotoData
import com.meyou.app.network.Dish.DishAiApiService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class DIshCat : AppCompatActivity() {
    private var catList = mutableListOf<DishDayPhotoData>()
    private val AI_BASE_URL = "https://k8e2031.p.ssafy.io/aiapi/"

    private val AiRetrofitWithoutToken = Retrofit.Builder()
        .baseUrl(AI_BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    fun getDishAiApi(): DishAiApiService {
        return AiRetrofitWithoutToken.create(DishAiApiService::class.java)
    }


    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tap2_dish_cat)

        val dishId = intent.getIntExtra("dishId", -1)

        // RecyclerView
        val dishNewData = findViewById<RecyclerView>(R.id.rvdish)
        dishNewData.layoutManager = LinearLayoutManager(this)

        // Adapter 설정
        val dishNewAdapter = ImageAdapter(this, catList)
        dishNewData.adapter = dishNewAdapter
//        dishNewData.layoutManager = GridLayoutManager(this, 2)



        // API 호출
        val dishApiService = getDishAiApi()
        val call = dishApiService.readDishAiApiService("EZZwEhRzzs9LvyZ") // 실제 serial number로 교체하세요

        call.enqueue(object : Callback<Map<String, List<String>>> {
            override fun onResponse(
                call: Call<Map<String, List<String>>>,
                response: Response<Map<String, List<String>>>
            ) {
                if (response.isSuccessful) {
                    val dishDataMap = response.body()
                    if (dishDataMap != null) {
                        catList.clear()
                        catList.addAll(dishDataMap.map { DishDayPhotoData(it.key, it.value) })
                        dishNewAdapter.notifyDataSetChanged()  // 새 데이터가 추가되었음을 어댑터에 알림
                    }
                } else {
                    Log.e("DishCat", "API request failed: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<Map<String, List<String>>>, t: Throwable) {
                Log.e("DishCat", "API request failed: ${t.message}")
            }
        })

        val tap1 = findViewById<TextView>(R.id.tap1)
        tap1.setOnClickListener {
            val intent = Intent(this, DetailActivity::class.java)
            intent.putExtra("dishId", dishId)
            startActivity(intent)
        }
        val tap3 = findViewById<TextView>(R.id.tap3)
        tap3.setOnClickListener {
            val intent = Intent(this, VisiteCatActivity::class.java)
            intent.putExtra("dishId", dishId)
            startActivity(intent)
        }
    }
}