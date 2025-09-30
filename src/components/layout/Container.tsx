import { ReactNode } from "react";

export default function Container({
  children,
  narrow = false,
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
  disabled?: boolean;
}) {
  const classNames = disabled
    ? ""
    : `${narrow ? "max-w-4xl" : "max-w-6xl"} mx-auto w-full px-4 lg:px-8 relative ${className}`;

  return <div className={classNames}>{children}</div>;
}
