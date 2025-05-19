"use client";

import { ReactNode, useCallback } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../casinogringos-v3/src/store/hooks";
import {
  closedMainMenu,
  closeMainMenu,
  closingMainMenu,
} from "../../../../casinogringos-v3/src/store/menuSlice";
import ModalSidebar from "@/app/components/ui/ModalSidebar";

const MenuModal = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isMainMenuOpen: isOpen, isMainMenuClosing: isClosing } =
    useAppSelector((state) => state.menu);
  const close = useCallback(() => {
    dispatch(closingMainMenu());
    setTimeout(() => {
      dispatch(closeMainMenu());
      dispatch(closedMainMenu());
    }, 300);
    document.body.classList.remove("overflow-hidden");
  }, [dispatch]);

  return (
    <ModalSidebar isOpen={isOpen} isClosing={isClosing} close={close}>
      {children}
    </ModalSidebar>
  );
};

export default MenuModal;
