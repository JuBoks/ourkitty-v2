import React from "react";

type Props = {
  images: string[];
};


export default function CatImages({ images }: Props) {
  return (
    <div className="w-full h-full gap-1">
      {images.length ===0 ?
        <div className="grid grid-cols-3 gap-2 p-3">사진 없음</div>
        :
        <div className="grid grid-cols-3 gap-2">  
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`cat-${index}`} className="w-full h-full" />
            </div>
          ))}
        </div> 
      }
    </div>
  );
}
