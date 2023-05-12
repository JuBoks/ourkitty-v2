package com.meyou.app.detailDish.tap2

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.meyou.app.R
import com.meyou.app.detailDish.tap1.DetailActivity
import com.meyou.app.detailDish.tap3.VisiteCatActivity

class DIshCat : AppCompatActivity() {
    private var catList = mutableListOf<DIshCatInfo>()
    override fun onCreate(savedInstanceState: Bundle?) {
        catList.add(
            DIshCatInfo(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "장군이네",
                true,
                "19:00~21:00"
            )
        )
        catList.add(
            DIshCatInfo(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "장군이네",
                true,
                "19:00~21:00"
            )
        )
        catList.add(
            DIshCatInfo(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "장군이네",
                false,
                "19:00~21:00"
            )
        )

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tap2_dish_cat)

        // RecyclerView 초기화
        val dishNewData = findViewById<RecyclerView>(R.id.rvdish)
        dishNewData.layoutManager = LinearLayoutManager(this)

        // Adapter 설정
        val dishNewAdapter = DishCatAdapter(this, catList)
        dishNewData.adapter = dishNewAdapter
        dishNewData.layoutManager = GridLayoutManager(this, 2)


        val tap1 = findViewById<TextView>(R.id.tap1)
        tap1.setOnClickListener {
            val intent = Intent(this, DetailActivity::class.java)
            startActivity(intent)
        }
        val tap3 = findViewById<TextView>(R.id.tap3)
        tap3.setOnClickListener {
            val intent = Intent(this, VisiteCatActivity::class.java)
            startActivity(intent)
        }
    }
}