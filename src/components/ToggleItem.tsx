"use client";

import { useAppSelector } from "../../../casinogringos-v3/src/store/hooks";
import { type ReactNode } from "react";

const ToggleItem = ({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) => {
  const { toggleIds } = useAppSelector((state) => state.toggle);
  const isOpen = toggleIds.includes(id);

  return (
    <div className={`${isOpen ? "block" : "hidden"} ${className}`}>
      {children}
    </div>
  );
};

export default ToggleItem;
