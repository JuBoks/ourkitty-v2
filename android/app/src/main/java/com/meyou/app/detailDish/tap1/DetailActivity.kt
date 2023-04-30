package com.meyou.app.detailDish.tap1

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageView
import android.widget.ProgressBar
import android.widget.TextView
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.meyou.app.detailDish.tap2.DIshCat
import com.meyou.app.main.ContentsMyDishList

class DetailActivity : AppCompatActivity() {
    private var dishList = mutableListOf<DetailDIshInfo>()

    override fun onCreate(savedInstanceState: Bundle?) {
        dishList.add(
            DetailDIshInfo(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "장군이네",
                "아이유정",
                20,
                10,
                2
            )
        )
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)
        // 클릭시 넘어온 dishId
        val dishId = intent.getStringExtra("dishId")
        var dishImage = findViewById<ImageView>(R.id.dishImage)
        val titleView = findViewById<TextView>(R.id.titleView)
        val addressView = findViewById<TextView>(R.id.addressView)
        val foodView = findViewById<TextView>(R.id.foodView)
        val batteryView = findViewById<TextView>(R.id.batteryView)
        val foodProgressBar = findViewById<ProgressBar>(R.id.foodProgressBar)
        val batteryProgressBar = findViewById<ProgressBar>(R.id.batteryProgressBar)

        if (dishList.isNotEmpty()) {
            titleView.text = dishList[0].dishName
            addressView.text = dishList[0].dishAddress
            foodView.text = dishList[0].food.toString()
            foodProgressBar.progress = dishList[0].food
            batteryView.text = dishList[0].battery.toString()
            batteryProgressBar.progress = dishList[0].battery
            Glide.with(this)
                .load(dishList[0].dishProfileImagePath)
                .into(dishImage)
        }


        // 상단 탭 클릭시 액티비티 이동
        val tap2 = findViewById<TextView>(R.id.tap2)
        tap2.setOnClickListener {
            val intent = Intent(this, DIshCat::class.java)
            startActivity(intent)
        }
    }

}