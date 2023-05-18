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
import com.meyou.app.network.management.Data
import com.tbuonomo.viewpagerdotsindicator.DotsIndicator

class ManagementAdapter(val context: Context, val list: MutableList<Data>) :
    RecyclerView.Adapter<ManagementAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ManagementAdapter.ViewHolder {
        var v = LayoutInflater.from(parent.context).inflate(R.layout.card_management, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(holder: ManagementAdapter.ViewHolder, position: Int) {
        holder.bindItems(list[position])
    }
    override fun getItemCount(): Int {
        return list.size
    }
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        private val userProfileImage = itemView.findViewById<ImageView>(R.id.userProfileImage)
        private val date = itemView.findViewById<TextView>(R.id.date)
        private val isEdit = itemView.findViewById<TextView>(R.id.is_edit)
        private val userName = itemView.findViewById<TextView>(R.id.userName)
        private val text = itemView.findViewById<TextView>(R.id.text)
        private val viewPager2 = itemView.findViewById<ViewPager2>(R.id.view_pager)
        private val dotsIndicator = itemView.findViewById<DotsIndicator>(R.id.dots_indicator)

        private lateinit var adapter: ImageAdapter

        fun bindItems(item: Data) {
            date.text = item.createdDate.substring(0, 10)
            isEdit.visibility = if (item.updatedDate != item.createdDate) View.VISIBLE else View.GONE
            userName.text = item.client.clientNickname
            text.text = item.managementContent
            Glide.with(itemView)
                .load(item.client.clientProfileImagePath)
                .into(userProfileImage)

            // managementImageList가 비어있지 않다면 이미지를 불러오고, 비어있다면 ViewPager2를 숨깁니다.
            if (item.managementImageList.isNotEmpty()) {
                // viewpager2에 이미지 추가
                adapter = ImageAdapter(context, item.managementImageList.map { it.imagePath })
                viewPager2.adapter = adapter

                // 인디케이터 연결
                dotsIndicator.setViewPager2(viewPager2)

                viewPager2.visibility = View.VISIBLE  // ViewPager2를 보이게 합니다.
                dotsIndicator.visibility = View.VISIBLE  // dotsIndicator를 보이게 합니다.
            } else {
                viewPager2.visibility = View.GONE  // ViewPager2를 숨깁니다.
                dotsIndicator.visibility = View.GONE  // dotsIndicator를 숨깁니다.
            }

            //클릭시 이동
            itemView.setOnClickListener {
                val intent = Intent(context, DetailManagementActivity::class.java)
                intent.putExtra("managementId", item.managementId)
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