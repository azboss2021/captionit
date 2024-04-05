"use client";

import Link from "next/link";
import CaptionDisplay from "./CaptionDisplay";
import { CaptionType } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

const CaptionColumnGenerator = ({ captions }: { captions: CaptionType[] }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [maxColumns, setMaxColumns] = useState(4);
  const [columnArrays, setColumnArrays] = useState<Array<CaptionType[]>>([]);

  useEffect(() => {
    updateClientDimensions();
    window.addEventListener("resize", updateClientDimensions);

    return () => {
      window.removeEventListener("resize", updateClientDimensions);
    };
  }, []);

  useEffect(() => {
    setColumnArrays(getColumnArrays());
  }, [maxColumns]);

  const updateClientDimensions = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      if (rect.width > 1200) setMaxColumns(4);
      else if (rect.width > 800) setMaxColumns(3);
      else if (rect.width > 400) setMaxColumns(2);
      else setMaxColumns(1);
    }
  };

  const getColumnArrays = () => {
    const columns = [];
    for (let i = 0; i < maxColumns; i++) {
      columns.push(getColumns(i));
    }
    return columns;
  };

  const getColumns = (colIndex: number) => {
    return captions.filter((_, index) => index % maxColumns === colIndex);
  };

  return (
    <div className={`grid w-full grid-cols-${maxColumns} gap-2`} ref={divRef}>
      {columnArrays.map((column, index) => (
        <div key={index} className="flex flex-col gap-2">
          {column.map((caption) => (
            <Link
              key={caption._id}
              href={`/caption/view/${caption._id}`}
              className="group overflow-hidden"
            >
              <div className="transition-transform duration-500 group-hover:scale-105">
                <CaptionDisplay caption={caption} width={400} height={300} />
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CaptionColumnGenerator;
