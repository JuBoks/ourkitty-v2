package com.meyou.app.management

import android.app.AlertDialog
import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
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
        val addButton: Button = findViewById(R.id.edit)
        addButton.setOnClickListener {
            // 커스텀 뷰를 inflate합니다.
            val dialogView = LayoutInflater.from(this).inflate(R.layout.custom_dialog_modal, null)

            // TextView에 텍스트를 설정합니다.
            val dialogMessage: TextView = dialogView.findViewById(R.id.dialogMessage)
            dialogMessage.text = "작성된 내용으로 수정 하시겠습니까?"

            // AlertDialog를 생성합니다.
            val customDialog = AlertDialog.Builder(this)
                .setView(dialogView)
                .show()
            customDialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

            // 확인 버튼에 대한 클릭 리스너를 설정합니다.
            val dialogConfirmButton: Button = dialogView.findViewById(R.id.dialogConfirmButton)
            dialogConfirmButton.setOnClickListener {
                Log.d("Modal", "작성완료")
                customDialog.dismiss()
            }

            // 취소 버튼에 대한 클릭 리스너를 설정합니다.
            val dialogCancelButton: Button = dialogView.findViewById(R.id.dialogCancelButton)
            dialogCancelButton.setOnClickListener {
                customDialog.dismiss()
            }
        }
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