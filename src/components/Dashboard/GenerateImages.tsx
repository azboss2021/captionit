"use client";

import { useState } from "react";
import GenerateImageForm from "./GenerateImageForm";
import GenerateImageProgress from "./GenerateImageProgress";
import GenerateImageShow from "./GenerateImageShow";

const GenerateImages = () => {
  const [phase, setPhase] = useState(0);
  const [loadingState, setLoadingState] = useState(
    "Sending prompt to our artists...",
  );

  if (phase === 0)
    return (
      <GenerateImageForm
        setPhase={setPhase}
        setLoadingState={setLoadingState}
      />
    );
  if (phase === 1) return <GenerateImageProgress loadingState={loadingState} />;
};

export default GenerateImages;
