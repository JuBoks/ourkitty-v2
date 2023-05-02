package com.meyou.app.main

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.meyou.app.detailDish.tap1.DetailActivity

class MyDishAdapter(val context: Context, val List : MutableList<ContentsMyDishList>) :
    RecyclerView.Adapter<MyDishAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyDishAdapter.ViewHolder {
        var v = LayoutInflater.from(parent.context).inflate(R.layout.main_mydisy_list, parent, false)

        return ViewHolder(v)
    }
    override fun onBindViewHolder(holder: MyDishAdapter.ViewHolder, position: Int) {
        holder.bindItems(List[position])
    }
    override fun getItemCount(): Int {
        return List.size
    }
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        fun bindItems(item : ContentsMyDishList) {
            val rv_img = itemView.findViewById<ImageView>(R.id.dishImage)
            val rv_name = itemView.findViewById<TextView>(R.id.dishName)
            val rv_address = itemView.findViewById<TextView>(R.id.dishAddressText)
            rv_name.text = item.dishName
            rv_address.text = item.dishAddress
            Glide.with(context)
                .load(item.dishProfileImagePath)
                .into(rv_img)
            itemView.setOnClickListener {
                val intent = Intent(context, DetailActivity::class.java)
                intent.putExtra("dishId", item.dishId)
                context.startActivity(intent)
            }
        }
    }
}