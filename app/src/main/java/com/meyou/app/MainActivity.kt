package com.meyou.app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView


    class MainActivity : AppCompatActivity() {
    private lateinit var navController: NavController
    private lateinit var appBarConfiguration: AppBarConfiguration

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.title = ""
        supportActionBar?.setDisplayHomeAsUpEnabled(true)


        // 내비게이션 컨트롤러
        val navHostFragment = supportFragmentManager.findFragmentById(R.id.fragmentContainerView) as NavHostFragment
        navController = navHostFragment.navController

        // 앱바 설정 객체
        appBarConfiguration = AppBarConfiguration(setOf(R.id.mainFragment, R.id.mapFragment, R.id.managementFragment, R.id.userFragment))


        val bottomNav : BottomNavigationView = findViewById(R.id.bottomNav)

        bottomNav.setupWithNavController(navController)

    }
}