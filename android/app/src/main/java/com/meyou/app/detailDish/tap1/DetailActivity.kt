package com.meyou.app.detailDish.tap1

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ImageView
import android.widget.ProgressBar
import android.widget.TextView
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.meyou.app.detailDish.ReportActivity
import com.meyou.app.detailDish.tap2.DIshCat
import com.meyou.app.detailDish.tap3.VisiteCatActivity
import com.meyou.app.main.ContentsDetailDishList
import com.meyou.app.main.Dish
import com.meyou.app.network.RetrofitInstance
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class DetailActivity : AppCompatActivity() {
    private var dishList = mutableListOf<Dish>()

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tap1_detail)
        // 클릭시 넘어온 dishId
        val dishId = intent.getIntExtra("dishId", -1)

        var dishImage = findViewById<ImageView>(R.id.dishImage)
        val titleView = findViewById<TextView>(R.id.titleView)
        val addressView = findViewById<TextView>(R.id.addressView)
        val foodView = findViewById<TextView>(R.id.foodView)
        val batteryView = findViewById<TextView>(R.id.batteryView)
        val foodProgressBar = findViewById<ProgressBar>(R.id.foodProgressBar)
        val batteryProgressBar = findViewById<ProgressBar>(R.id.batteryProgressBar)

        val sharedPreferences = this.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        val service = retrofitInstance.getDetailDish()

        service.getDetailDish(dishId).enqueue(object : Callback<ContentsDetailDishList> {
            override fun onResponse(call: Call<ContentsDetailDishList>, response: Response<ContentsDetailDishList>) {
                if (response.isSuccessful) {
                    Log.d("test",response.body()?.data.toString())
                    val dish = response.body()?.data
                    if (dish != null) {
                        dishList.add(dish)

                        // Update UI
                        titleView.text = dish.dishName
                        addressView.text = dish.dishAddress
                        foodView.text = dish.dishWeight.toString()
                        foodProgressBar.progress = dish.dishWeight
                        batteryView.text = dish.dishBatteryState.toString()
                        batteryProgressBar.progress = dish.dishBatteryState
                        Glide.with(this@DetailActivity)
                            .load(dish.dishProfileImagePath)
                            .into(dishImage)
                    }
                } else {
                    // Handle error
                }
            }

            override fun onFailure(call: Call<ContentsDetailDishList>, t: Throwable) {
                // Handle failure
            }
        })

        // 상단 탭 클릭시 액티비티 이동
        val tap2 = findViewById<TextView>(R.id.tap2)
        tap2.setOnClickListener {
            val intent = Intent(this, DIshCat::class.java)
            startActivity(intent)
        }
        val tap3 = findViewById<TextView>(R.id.tap3)
        tap3.setOnClickListener {
            val intent = Intent(this, VisiteCatActivity::class.java)
            startActivity(intent)
        }

        // 신고 아이콘 클릭시 신고 페이지로 이동
        val report = findViewById<ImageView>(R.id.report)
        report.setOnClickListener {
            val intent = Intent(this, ReportActivity::class.java)
            startActivity(intent)
        }
    }

}