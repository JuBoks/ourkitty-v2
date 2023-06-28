import ModalCatConfirm from "components/common/ModalCatConfirm";
import React, { useState } from "react";
import { ReactComponent as InfoButton } from "assets/info.svg";

export default function ChartIoTImage({ imageUrl }: { imageUrl: string}) {

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  return (
    <>
    <img src={imageUrl} className="w-full h-full" alt="cat" />
    <div className="relative mr-[-1rem]">
        <button
            className="absolute top-4 right-8 bg-white rounded-full"
            onClick={() => setModalOpen(true)}
        >  <InfoButton className="w-[1rem] h-[1rem]"/> </button>
 
        <ModalCatConfirm open={modalOpen} close={closeModal} header="중성화 여부 파악">
            <img src={imageUrl} className="w-full h-full" alt="cat" />
        </ModalCatConfirm>
    </div>
    </>
  );
}
