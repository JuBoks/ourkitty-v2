package com.meyou.app.map

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.meyou.app.R

class DishAdapter(private val context: Context) : RecyclerView.Adapter<DishAdapter.ViewHolder>() {

    var datas = mutableListOf<DishData>()
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.dish_recycler_item,parent,false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int = datas.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(datas[position])
    }

    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {

        private val txtName: TextView = itemView.findViewById(R.id.dish_name)
        private val txtAddress: TextView = itemView.findViewById(R.id.dish_address)
        private val txtFood: TextView = itemView.findViewById(R.id.food)
        private val txtBattery: TextView = itemView.findViewById(R.id.battery)
        private val food: ProgressBar = itemView.findViewById(R.id.remain_food)
        private val battery: ProgressBar = itemView.findViewById(R.id.remain_battery)

        fun bind(item: DishData) {
            txtName.text = item.dishName
            txtAddress.text = item.dishAddress
            txtFood.text = item.dishWeight.toString()
            txtBattery.text = item.dishBatteryState.toString()
            food.progress = item.dishWeight
            battery.progress = item.dishBatteryState

        }
    }


}