package com.meyou.app.user

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.meyou.app.R
import com.meyou.app.SplashActivity

class UserFragment : Fragment() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_user, container, false)

        val logoutButton = view.findViewById<TextView>(R.id.logout)
        logoutButton.setOnClickListener {
            val sharedPreferences = requireActivity().getSharedPreferences("myPrefs", Context.MODE_PRIVATE)
            val editor = sharedPreferences.edit()
            editor.remove("isLoggedIn")
            editor.apply()
            val intent = Intent(activity, SplashActivity::class.java)
            startActivity(intent)
            activity?.finish()
        }

        return view
    }

}