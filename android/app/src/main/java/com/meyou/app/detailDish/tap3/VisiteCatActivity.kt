package com.meyou.app.detailDish.tap3

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.meyou.app.R
import com.meyou.app.detailDish.tap1.DetailActivity
import com.meyou.app.detailDish.tap2.DIshCat
import com.meyou.app.main.DishImagesResponse
import com.meyou.app.main.VisiteCatInfo
import com.meyou.app.network.RetrofitInstance
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class VisiteCatActivity : AppCompatActivity() {
    private var dishList = mutableListOf<VisiteCatInfo>()

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tap3_visite_cat)

        val dishId = intent.getIntExtra("dishId", -1)
        // RecyclerView 초기화
        val dishNewData = findViewById<RecyclerView>(R.id.rvdish)
        dishNewData.layoutManager = LinearLayoutManager(this)
        dishNewData.layoutManager = GridLayoutManager(this, 2)

        val sharedPreferences = this.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        // API 호출
        val service = retrofitInstance.getDishImage()
        service.getDishImage(dishId).enqueue(object: Callback<DishImagesResponse> {
            override fun onResponse(
                call: Call<DishImagesResponse>,
                response: Response<DishImagesResponse>
            ) {
                if (response.isSuccessful) {
                    dishList.clear()
                    response.body()?.data?.forEach { dishImage ->
                        if (!dishImage.isDeleted) {
                            dishList.add(VisiteCatInfo(dishImage.createdDate, dishImage.imagePath))
                        }
                    }
                    val dishNewAdapter = VisiteCatAdapter(this@VisiteCatActivity, dishList)
                    dishNewData.adapter = dishNewAdapter
                    dishNewAdapter.notifyDataSetChanged()
                }
            }

            override fun onFailure(call: Call<DishImagesResponse>, t: Throwable) {
                // Handle error here
            }
        })

        // 상단 탭 클릭시 액티비티 이동
        val tap1 = findViewById<TextView>(R.id.tap1)
        tap1.setOnClickListener {
            val intent = Intent(this, DetailActivity::class.java)
            intent.putExtra("dishId", dishId)
            startActivity(intent)
        }
        val tap2 = findViewById<TextView>(R.id.tap2)
        tap2.setOnClickListener {
            val intent = Intent(this, DIshCat::class.java)
            intent.putExtra("dishId", dishId)
            startActivity(intent)
        }

    }
}