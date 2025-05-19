"use client";

import dynamic from "next/dynamic";
const Overlay = dynamic(
  () => import("../../../../casinogringos-v3/src/components/Overlay"),
);

const ModalSidebar = ({ isOpen, isClosing, close, children }) => {
  return (
    <>
      {isOpen && <Overlay closing={isClosing} close={close} />}
      <div
        className={`fixed max-w-full right-0 top-14 lg:top-16 bottom-0 p-5 w-full md:w-96 bg-white z-[100] ease-in-out duration-300 overflow-y-auto ${
          isOpen && !isClosing ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default ModalSidebar;
