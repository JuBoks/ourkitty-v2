import React, {useEffect} from "react";
import DishCard from "components/common/DishCard";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { dishCountState } from "../../recoil/dish";
import { getDishList } from "../../apis/api/dish";
import { darkState } from "../../recoil/page";


interface detailData {
  createdData: string;
  dishAddress: string;
  dishCatCount: number;
  dishId: number;
  dishLat: number;
  dishLong: number;
  dishName: string;
  dishProfileImagePath: string;
  dishSerialNum: string;
  dishTnrCount: number;
  dishWeight: number;
  isDeleted: boolean;
  locationCode: string;
  updatedDate: string;
}

export default function DishInfoCard() {

  const dishCount = useRecoilState(dishCountState)[0];
  const isDark = useRecoilState(darkState)[0];

  const { data, isLoading } = useQuery({
    queryKey: ["getDishList", dishCount],
    queryFn: () => getDishList(),
  });


  if (isLoading || data === undefined) return null;

  return (
    <div className="w-full h-full p-1 flex flex-row gap-2 overflow-auto">
      {data.data.length === 0 ? (
        <div>등록된 급식소가 없습니다</div>
      ) : (
        <>
          {data.data.map((item: detailData) => (
            <div key={item.dishId}>
              <DishCard> 
                <div className="flex flex-col justify-around h-full bg-white rounded-lg p-4 ">
                  <div className="flex flex-row justify-center h-[50%]">
                    {item.dishProfileImagePath !== "" && 
                    (
                      <img
                        src={item.dishProfileImagePath}
                        alt=""
                        className="h-full w-full rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex flex-col h-[1rem]" />

                  <div className="flex flex-col h-[40%] mt-[1.5rem] flex flex-col justify-between text-[0.7rem]">
                    <div className="flex flex-row justify-between mb-2">
                      <div className="font-semibold">이름:</div>
                      <div className="truncate">{item.dishName}</div>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <div className="font-semibold">주소:</div>
                      <div className="truncate">{item.dishAddress}</div>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <div className="font-semibold">담당 캣맘:</div>
                      <div className="truncate">3 명</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="font-semibold">중성화율:</div>
                      <div className="truncate">
                        10 %
                      </div>
                    </div>
                  </div>
                </div>   
            </DishCard>
            
            </div>
          ))}
        </>
      )}
    </div>
  );
}
