package com.meyou.app.detailDish.tap2

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.meyou.app.main.DishDayPhotoData
import com.meyou.app.map.DishAdapter

class ImageAdapter(val context: Context, val dishCatList : List<DishDayPhotoData>):
    RecyclerView.Adapter<ImageAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageAdapter.ViewHolder {
        var v = LayoutInflater.from(parent.context).inflate(R.layout.detail_tap2_cat_list, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(holder: ImageAdapter.ViewHolder, position: Int) {
        holder.bindItems(dishCatList[position])
    }

    override fun getItemCount(): Int {
        return dishCatList.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bindItems(item: DishDayPhotoData) {
            val rv_date = itemView.findViewById<TextView>(R.id.catDate)
            val rv_images = itemView.findViewById<RecyclerView>(R.id.catImages)

            rv_date.text = item.date
            rv_images.layoutManager = LinearLayoutManager(context)
            rv_images.layoutManager = GridLayoutManager(context, 2)

            rv_images.adapter = DishCatAdapter(context, item.photos)
        }
    }
}