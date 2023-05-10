package com.meyou.app.main

import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.meyou.app.R
import com.meyou.app.network.RetrofitInstance
import com.naver.maps.geometry.LatLng
import com.naver.maps.map.MapView
import com.naver.maps.map.NaverMap
import com.naver.maps.map.OnMapReadyCallback
import com.naver.maps.map.overlay.Marker
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class MainFragment : Fragment(), OnMapReadyCallback {

    private var dishList = mutableListOf<Dish>()
    private lateinit var mapView: MapView
    private lateinit var naverMap: NaverMap
    private val marker = Marker()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val dishData = view.findViewById<RecyclerView>(R.id.rv)
        val dishAdapter = MyDishAdapter(requireContext(), dishList)
        dishData.adapter = dishAdapter
        dishData.layoutManager = LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false)

        val sharedPreferences = this.activity?.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        // Retrofit 인스턴스를 가져와서
        val service = retrofitInstance.getDishList()

        // getDishes() 메소드를 호출합니다.
        service.getDishes().enqueue(object : Callback<ContentsMyDishList> {
            // 응답이 성공적으로 왔을 때
            override fun onResponse(call: Call<ContentsMyDishList>, response: Response<ContentsMyDishList>) {
                if (response.isSuccessful) {
                    // dishList를 비우고
                    dishList.clear()
                    // 응답에서 받은 데이터를 추가한 뒤
                    dishList.addAll(response.body()?.data ?: emptyList())
                    // 어댑터에게 데이터가 변경되었음을 알립니다.
                    dishAdapter.notifyDataSetChanged()
                } else {
                    // 응답이 성공적으로 오지 않았을 때의 처리를 해야 합니다.
                }
            }

            // 요청이 실패했을 때
            override fun onFailure(call: Call<ContentsMyDishList>, t: Throwable) {
                // 예를 들어 네트워크 연결이 없는 등의 이유로 요청이 실패했을 때의 처리를 해야 합니다.
            }
        })
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // 프래그먼트의 레이아웃을 inflate 합니다.
        val rootView = inflater.inflate(R.layout.fragment_main, container, false)

        // 뒤로가기 버튼을 비활성화합니다.
        (activity as? AppCompatActivity)?.supportActionBar?.setDisplayHomeAsUpEnabled(false)

//        mapView = rootView.findViewById(com.naver.maps.map.R.id.navermap_map_view)
//        mapView.onCreate(savedInstanceState)
//        mapView.getMapAsync(this)

        return rootView
    }

    override fun onMapReady(p0: NaverMap) {
        this.naverMap = naverMap
        marker.position = LatLng(37.5670135, 126.9783740)
        marker.map = naverMap
    }
}







