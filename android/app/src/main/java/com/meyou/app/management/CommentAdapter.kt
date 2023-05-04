package com.meyou.app.management

import android.content.Context

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