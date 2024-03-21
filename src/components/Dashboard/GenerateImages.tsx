"use client";

import { useState } from "react";
import GenerateImageForm from "./GenerateImageForm";
import GenerateImageProgress from "./GenerateImageProgress";
import GenerateImageShow from "./GenerateImageShow";

const GenerateImages = () => {
  const [phase, setPhase] = useState(0);

  if (phase === 0) return <GenerateImageForm setPhase={setPhase} />;
  if (phase === 1) return <GenerateImageProgress setPhase={setPhase} />;
  if (phase === 2) return <GenerateImageShow setPhase={setPhase} />;
};

export default GenerateImages;
