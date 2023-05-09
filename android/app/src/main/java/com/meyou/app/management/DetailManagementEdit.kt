package com.meyou.app.management

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.tbuonomo.viewpagerdotsindicator.DotsIndicator

class DetailManagementEdit : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_management_edit)

        val imageUrls = intent.getStringArrayListExtra("imageUrls")
        val userName = intent.getStringExtra("userName")
        val userProfileImage = intent.getStringExtra("userProfileImage")
        val message = intent.getStringExtra("message")

        val viewPager: ViewPager2 = findViewById(R.id.view_pager)
        val dotsIndicator: DotsIndicator = findViewById(R.id.dots_indicator)
        val userProfileImageView: ImageView = findViewById(R.id.userProfileImage)
        val userNameTextView: TextView = findViewById(R.id.userName)
        val commentInput: EditText = findViewById(R.id.comment_input)

        // UserProfileImage 설정
        Glide.with(this)
            .load(userProfileImage)
            .circleCrop()
            .into(userProfileImageView)

        // UserName 설정
        userNameTextView.text = userName

        // ViewPager2와 DotsIndicator 설정
        val imageAdapter = ImageAdapter(imageUrls.orEmpty())
        viewPager.adapter = imageAdapter
        dotsIndicator.setViewPager2(viewPager)

        // EditText 초기 값 설정
        commentInput.setText(message)
    }
}
class ImageAdapter(private val imageUrls: List<String>) : RecyclerView.Adapter<ImageAdapter.ViewHolder>() {

    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val imageView: ImageView = view.findViewById(R.id.image_view)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val context: Context = parent.context
        val inflater = LayoutInflater.from(context)
        val imageView = inflater.inflate(R.layout.slide_image_item, parent, false)

        return ViewHolder(imageView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val imageUrl = imageUrls[position]

        Glide.with(holder.imageView.context)
            .load(imageUrl)
            .into(holder.imageView)
    }

    override fun getItemCount(): Int {
        return imageUrls.size
    }

}