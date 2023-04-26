package com.meyou.app.detailDish.tap1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import com.meyou.app.R

class DetailActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)
        val address = intent.getStringExtra("address")
        val titleView = findViewById<TextView>(R.id.titleView)
        titleView.text = address
    }

}