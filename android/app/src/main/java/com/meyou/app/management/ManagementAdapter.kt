package com.meyou.app.management

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.tbuonomo.viewpagerdotsindicator.DotsIndicator

class ManagementAdapter(val context: Context, val List : MutableList<ManagementInfo>) :
    RecyclerView.Adapter<ManagementAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ManagementAdapter.ViewHolder {
        var v = LayoutInflater.from(parent.context).inflate(R.layout.card_management, parent, false)
        return ViewHolder(v)
    }


    override fun onBindViewHolder(holder: ManagementAdapter.ViewHolder, position: Int) {
        holder.bindItems(List[position])
    }
    override fun getItemCount(): Int {
        return List.size
    }
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        private val userProfileImage = itemView.findViewById<ImageView>(R.id.userProfileImage)
        private val date = itemView.findViewById<TextView>(R.id.date)
        private val isEdit = itemView.findViewById<TextView>(R.id.is_edit)
        private val userName = itemView.findViewById<TextView>(R.id.userName)
        private val userAddress = itemView.findViewById<TextView>(R.id.userAddress)
        private val text = itemView.findViewById<TextView>(R.id.text)
        private val viewPager2 = itemView.findViewById<ViewPager2>(R.id.view_pager)
        private val dotsIndicator = itemView.findViewById<DotsIndicator>(R.id.dots_indicator)

        private lateinit var adapter: ImageAdapter

        fun bindItems(item: ManagementInfo) {
            date.text = item.date
            isEdit.visibility = if (item.isEdit) View.VISIBLE else View.GONE
            userName.text = item.userName
            userAddress.text = item.userAddress
            text.text = item.text

            // viewpager2에 이미지 추가
            adapter = ImageAdapter(context, item.imageUrls ?: emptyList())
            viewPager2.adapter = adapter

            // 인디케이터 연결
            dotsIndicator.setViewPager2(viewPager2)

            Glide.with(context)
                .load(item.userProfileImage)
                .into(userProfileImage)

            //클릭시 이동
            itemView.setOnClickListener {
                val intent = Intent(context, DetailManagementActivity::class.java)
                intent.putExtra("managementId", item.managementId.toString())
                context.startActivity(intent)
            }
        }
    }
    class ImageAdapter(private val context: Context, private val imageUrls: List<String>) : RecyclerView.Adapter<ImageAdapter.ImageViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageViewHolder {
            val view = LayoutInflater.from(parent.context).inflate(R.layout.slide_image_item, parent, false)
            return ImageViewHolder(view)
        }

        override fun onBindViewHolder(holder: ImageViewHolder, position: Int) {
            val imageUrl = imageUrls[position]
            Glide.with(holder.itemView.context).load(imageUrl).into(holder.imageView)
        }

        override fun getItemCount(): Int {
            return imageUrls.size
        }

        inner class ImageViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val imageView: ImageView = itemView.findViewById(R.id.image_view)
        }

    }
}