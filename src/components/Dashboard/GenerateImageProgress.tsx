"use client";

import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { FaSpinner } from "react-icons/fa6";

const GenerateImageProgress = ({ loadingState }: { loadingState: string }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <span className="text-center font-semibold">{loadingState}</span>
      <FaSpinner className="animate-spin" size={32} />
    </section>
  );
};
export default GenerateImageProgress;
