package com.meyou.app.management

import android.app.AlertDialog
import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.util.Log

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.meyou.app.R

class CommentAdapter(private val context: Context, private val comments: List<UserComment>) :
    RecyclerView.Adapter<CommentAdapter.CommentViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CommentViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.fragment_comment_adapter, parent, false)
        return CommentViewHolder(view)
    }

    override fun onBindViewHolder(holder: CommentViewHolder, position: Int) {
        val comment = comments[position]

        Glide.with(holder.itemView.context).load(comment.userProfileImage).into(holder.userProfileImage)
        holder.userName.text = comment.userName
        holder.date.text = comment.date
        holder.comment.text = comment.comment

        holder.delete.setOnClickListener {
            // 커스텀 뷰를 inflate
            val dialogView = LayoutInflater.from(context).inflate(R.layout.custom_dialog_modal, null)

            // TextView에 텍스트를 설정
            val dialogMessage: TextView = dialogView.findViewById(R.id.dialogMessage)
            dialogMessage.text = "댓글을 삭제하시겠습니까?"

            // AlertDialog를 생성
            val customDialog = AlertDialog.Builder(context)
                .setView(dialogView)
                .show()
            customDialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

            // 확인 버튼에 대한 클릭 리스너를 설정
            val dialogConfirmButton: Button = dialogView.findViewById(R.id.dialogConfirmButton)
            dialogConfirmButton.setOnClickListener {
                Log.d("Modal", "삭제완료")
                customDialog.dismiss()
            }

            // 취소 버튼에 대한 클릭 리스너를 설정
            val dialogCancelButton: Button = dialogView.findViewById(R.id.dialogCancelButton)
            dialogCancelButton.setOnClickListener {
                customDialog.dismiss()
            }
        }
    }

    override fun getItemCount(): Int {
        return comments.size
    }

    inner class CommentViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val userProfileImage: ImageView = itemView.findViewById(R.id.userProfileImage)
        val userName: TextView = itemView.findViewById(R.id.userName)
        val date: TextView = itemView.findViewById(R.id.date)
        val comment: TextView = itemView.findViewById(R.id.comment)
        val delete: Button = itemView.findViewById(R.id.delete)
    }
}