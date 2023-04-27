package com.meyou.app.detailDish.tap1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import com.meyou.app.R
import com.meyou.app.main.ContentsMyDishList

class DetailActivity : AppCompatActivity() {
    private var dishList = mutableListOf<DetailDIshInfo>()

    override fun onCreate(savedInstanceState: Bundle?) {
        dishList.add(
            DetailDIshInfo(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "장군이네",
                "아이유정",
                10
            )
        )
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)
        val address = intent.getStringExtra("address")
        val titleView = findViewById<TextView>(R.id.titleView)
        titleView.text = address
    }

}