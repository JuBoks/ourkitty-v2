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

class DishCatAdapter(val context: Context, val dishCatList : List<DIshCatInfo>):
    RecyclerView.Adapter<DishCatAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DishCatAdapter.ViewHolder {
        var v = LayoutInflater.from(parent.context).inflate(R.layout.detail_tap2_cat_list, parent, false)

        return ViewHolder(v)    }

    override fun onBindViewHolder(holder: DishCatAdapter.ViewHolder, position: Int) {
        holder.bindItems(dishCatList[position])
    }

    override fun getItemCount(): Int {
        return dishCatList.size
    }
    inner class ViewHolder(itemView: View) :
        RecyclerView.ViewHolder(itemView){
        fun bindItems(item : DIshCatInfo) {
            val rv_img = itemView.findViewById<ImageView>(R.id.catImage)
            val rv_tnr = itemView.findViewById<TextView>(R.id.tnr)
            val rv_time = itemView.findViewById<TextView>(R.id.time)
            rv_time.text = item.time
            if (item.isTNR) {rv_tnr.text = "O" }
            else {rv_tnr.text = "X" }

            Glide.with(context)
                .load(item.dishProfileImagePath)
                .into(rv_img)
        }
    }
}