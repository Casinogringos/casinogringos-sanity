"use client";

import { useEffect, useState } from "react";

const DynamicDate = ({ timestamp, className }: { timestamp: number, className?: string }) => {
  const [date, setDate] = useState("");
  useEffect(() => {
    const getDate = () =>
      new Date(timestamp).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    setDate(getDate());
  }, [timestamp]);
  if (!date) return null;

  return <time className={className}>{date}</time>;
};

export default DynamicDate;
