"use client";

import { ReactNode } from "react";

const Button = ({
  children,
  callback,
  className,
  size = "medium",
}: {
  children: ReactNode;
  callback?: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
}) => {
  const sizeClass = {
    small: "p-2",
    medium: "p-2",
    large: "py-4 px-6",
  };
  return (
    <button
      onClick={() => (callback ? callback() : null)}
      className={`${className} bg-button hover:bg-buttonHover text-white text-sm rounded-md ${sizeClass[size]}`}
    >
      {children}
    </button>
  );
};

export default Button;
