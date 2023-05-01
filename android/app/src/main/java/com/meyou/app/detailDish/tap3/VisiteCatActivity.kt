package com.meyou.app.detailDish.tap3

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.meyou.app.R
import com.meyou.app.detailDish.tap1.DetailActivity
import com.meyou.app.detailDish.tap1.DetailDIshInfo
import com.meyou.app.detailDish.tap2.DIshCat
import com.meyou.app.detailDish.tap2.DishCatAdapter

class VisiteCatActivity : AppCompatActivity() {
    private var dishList = mutableListOf<VisiteCatInfo>()

    override fun onCreate(savedInstanceState: Bundle?) {
        dishList.add(
            VisiteCatInfo(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "2023-05-01 15:30",
            )
        )
        dishList.add(
            VisiteCatInfo(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "2023-05-01 15:30",
            )
        )
        dishList.add(
            VisiteCatInfo(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "2023-05-01 15:30",
            )
        )
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tap3_visite_cat)


        // RecyclerView 초기화
        val dishNewData = findViewById<RecyclerView>(R.id.rvdish)
        dishNewData.layoutManager = LinearLayoutManager(this)

        // Adapter 설정
        val dishNewAdapter = VisiteCatAdapter(this, dishList)
        dishNewData.adapter = dishNewAdapter
        dishNewData.layoutManager = GridLayoutManager(this, 2)




        // 상단 탭 클릭시 액티비티 이동
        val tap1 = findViewById<TextView>(R.id.tap1)
        tap1.setOnClickListener {
            val intent = Intent(this, DetailActivity::class.java)
            startActivity(intent)
        }
        val tap2 = findViewById<TextView>(R.id.tap2)
        tap2.setOnClickListener {
            val intent = Intent(this, DIshCat::class.java)
            startActivity(intent)
        }

    }
}