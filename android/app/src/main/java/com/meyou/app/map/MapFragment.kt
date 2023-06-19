package com.meyou.app.map

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.meyou.app.R
import com.meyou.app.main.ContentsMyDishList
import com.meyou.app.main.Dish
import com.meyou.app.network_API.RetrofitInstance
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MapFragment : Fragment() {
    private lateinit var mContext: Context
    private lateinit var profileAdapter: DishAdapter
    val datas = mutableListOf<DishData>()
    val result = mutableListOf<Dish>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        context?.let {
            mContext = it
        }

        val sharedPreferences = this.activity?.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        val service = retrofitInstance.getDishList()

        service.getDishes().enqueue(object : Callback<ContentsMyDishList> {
            override fun onResponse(call: Call<ContentsMyDishList>, response: Response<ContentsMyDishList>) {
                if (response.isSuccessful) {
                    result.clear()
                    result.addAll(response.body()?.data ?: emptyList())

                    fun initRecycler() {
                        profileAdapter = DishAdapter(mContext)
                        val rv_profile = view.findViewById<RecyclerView>(R.id.rv_profile)
                        rv_profile.adapter = profileAdapter


                        datas.apply {
                            for (item: Dish in result) {
                                add(DishData(dishName = item.dishName, dishAddress = item.dishAddress, dishWeight = item.dishWeight, dishBatteryState = item.dishBatteryState))
                            }
                            profileAdapter.datas = datas
                            profileAdapter.notifyDataSetChanged()

                        }
                    }
                    initRecycler()
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
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_map, container, false)

        return view
    }

}