import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getDishList } from "../../apis/api/dish";

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

export default function MyDishButtons() {
  const { data, isLoading } = useQuery({
    queryKey: "getDishList",
    queryFn: () => getDishList(),
  });

  const [button, setButton] = useState<detailData[]>([]);
  const [selectedButton, setSelectedButton] = useState<number>(1);

  useEffect(() => {
    if (data !== undefined) {
      const newButtons = data.data.map((item: { dishId:any, dishName: any }) => ({
        dishId: item.dishId,
        dishName: item.dishName,
      }));
      setButton(newButtons);
    }
  }, [data]);


  const handleClick = (id: number) => {
    setSelectedButton(id);
  };

  if (isLoading || data === undefined) return null;

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {button.map((item) => (
        <button
          key={item.dishId}
          className={`w-full h-[3rem] px-3 rounded-lg text-black font-bold hover:bg-LightMain dark:hover:bg-DarkMain border border-LightMain ${
            selectedButton === item.dishId
              ? "bg-LightMain text-white"
              : "bg-white"
          }`}
          onClick={() => handleClick(item.dishId)}
        >
          {item.dishName}
        </button>
      ))}
    </div>
  );
}
