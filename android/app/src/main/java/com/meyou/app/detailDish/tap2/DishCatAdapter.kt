package com.meyou.app.detailDish.tap2

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.meyou.app.main.DishDayPhotoData

class DishCatAdapter(val context: Context, val imageList: List<String>):
    RecyclerView.Adapter<DishCatAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DishCatAdapter.ViewHolder {
        var v = LayoutInflater.from(parent.context).inflate(R.layout.detail_tap2_cat_card, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(holder: DishCatAdapter.ViewHolder, position: Int) {
        holder.bindItems(imageList[position])
    }

    override fun getItemCount(): Int {
        return imageList.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bindItems(imageUrl: String) {
            val img = itemView.findViewById<ImageView>(R.id.catImage)
            Glide.with(context).load(imageUrl).into(img)
        }
    }
}