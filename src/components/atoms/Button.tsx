"use client";

import { ReactNode } from "react";

const Button = ({
  children,
  callback,
  className,
  size = "medium",
  variant = "primary",
  isActive = false,
}: {
  children: ReactNode;
  callback?: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "affiliate";
  isActive?: boolean;
}) => {
  const sizeClass = {
    small: "p-2",
    medium: "p-2",
    large: "py-4 px-6",
  };
  const getClassName = () => {
    switch (variant) {
      case 'affiliate':
        return `bg-button hover:bg-button-hover not-prose inline-block justify-center lg:text-lg text-white no-underline text-center font-semibold rounded-md`
      case 'primary':
        return 'rounded-md border border-dark/20 bg-dark px-4 py-2 font-medium text-white transition hover:text-primary'
      default:
        return `${isActive ? 'text-primary' : 'hover:text-primary'}`
    }
  }

  return (
    <button
      onClick={() => (callback ? callback() : null)}
      className={`${className} ${getClassName()} ${sizeClass[size]} cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
