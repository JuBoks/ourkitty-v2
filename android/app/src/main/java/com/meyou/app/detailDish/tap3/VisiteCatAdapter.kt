package com.meyou.app.detailDish.tap3

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.meyou.app.R

class VisiteCatAdapter(val context: Context, val List : List<VisiteCatInfo>):
    RecyclerView.Adapter<VisiteCatAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VisiteCatAdapter.ViewHolder {
        var v = LayoutInflater.from(parent.context).inflate(R.layout.detail_tap3_visite_cat, parent, false)

        return ViewHolder(v)    }

    override fun onBindViewHolder(holder: VisiteCatAdapter.ViewHolder, position: Int) {
        holder.bindItems(List[position])
    }

    override fun getItemCount(): Int {
        return List.size
    }
    inner class ViewHolder(itemView: View) :
        RecyclerView.ViewHolder(itemView){
        fun bindItems(item : VisiteCatInfo) {
            val rv_img = itemView.findViewById<ImageView>(R.id.catImage)
            val rv_time = itemView.findViewById<TextView>(R.id.time)
            rv_time.text = item.time

            Glide.with(context)
                .load(item.dishProfileImagePath)
                .into(rv_img)
        }
    }
}