"use client";

import { CaptionType } from "@/lib/types";
import CaptionDisplay from "./CaptionDisplay";
import CaptionColumnGenerator from "./CaptionColumnGenerator";

const YourCaptions = ({
  captions,
  width,
  height,
}: {
  captions: CaptionType[];
  width: number;
  height: number;
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <CaptionColumnGenerator captions={captions} />
      {/* {captions.map((caption, index) => (
        <CaptionDisplay
          key={index}
          caption={caption}
          width={width}
          height={height}
          link={true}
        />
      ))} */}
    </div>
  );
};
export default YourCaptions;
