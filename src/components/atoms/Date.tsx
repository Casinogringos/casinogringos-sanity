"use client";

import { useEffect, useState } from "react";

const DynamicDate = ({ dateString }: { dateString: string }) => {
  console.log('dateString', dateString)
  const [date, setDate] = useState("");
  useEffect(() => {
    const getDate = () =>
      new Date(dateString).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    setDate(getDate());
  }, [dateString]);
  if (!date) return null;

  return <time>{date}</time>;
};

export default DynamicDate;
