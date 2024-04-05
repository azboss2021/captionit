"use client";

import { impact } from "@/lib/fonts";
import CloudinaryImage from "./Dashboard/CloudinaryImage";
import { CaptionType } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CaptionDisplay = ({
  caption,
  width,
  height,
  link = false,
}: {
  caption: CaptionType;
  width: number;
  height: number;
  link?: boolean;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number>(0.0);
  const [divWidth, setDivWidth] = useState<number>(0.0);

  useEffect(() => {
    updateClientDimensions();
    window.addEventListener("resize", updateClientDimensions);

    return () => {
      window.removeEventListener("resize", updateClientDimensions);
    };
  }, []);

  const updateClientDimensions = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setDivHeight(rect.height);
      setDivWidth(rect.width);
    }
  };

  return link ? (
    <Link
      href={`/caption/view/${caption._id}`}
      className="relative h-full w-fit overflow-hidden"
      style={{
        height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
      }}
    >
      <div
        className="bg-white"
        style={{
          height: `${caption.whiteSpace}px`,
          width: `${divWidth}px`,
        }}
      />

      <div ref={divRef} className="z-0">
        <CloudinaryImage
          publicId={caption.imageId}
          width={width}
          height={height}
          className="max-h-[400px] w-auto"
        />
      </div>

      <div
        className="bg-white"
        style={{
          height: `${caption.whiteSpace}px`,
          width: `${divWidth}px`,
        }}
      />
      <span
        className={`${impact.className} ${caption.uppercase && "uppercase"} ${caption.bold && "font-bold"} ${caption.italic && "italic"} absolute left-0 top-0 flex ${caption.topTextAlign === "left" && "text-left"} ${caption.topTextAlign === "center" && "text-center"} ${caption.topTextAlign === "right" && "text-right"} ${caption.topTextVerticalAlign === "top" && "items-start"} ${caption.topTextVerticalAlign === "center" && "items-center"} ${caption.topTextVerticalAlign === "bottom" && "items-end"} ${caption.topTextHorizontalAlign === "left" && "justify-start"} ${caption.topTextHorizontalAlign === "center" && "justify-center"} ${caption.topTextHorizontalAlign === "right" && "justify-end"} z-10 leading-none text-white`}
        style={{
          WebkitTextFillColor: "transparent",
          WebkitTextStrokeWidth: `${caption.strokeWidth}px`,
          WebkitTextStrokeColor: "black",
          fontSize: `${caption.topTextSize}px`,
          paddingTop: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingBottom: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingLeft: `${caption.xPadding + caption.strokeWidth / 2}px`,
          paddingRight: `${caption.xPadding + caption.strokeWidth / 2}px`,
          height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
          width: `${divWidth}px`,
        }}
      >
        {caption.topText}
      </span>
      <span
        className={`${impact.className} ${caption.uppercase && "uppercase"} ${caption.bold && "font-bold"} ${caption.italic && "italic"} absolute left-0 top-0 flex ${caption.topTextAlign === "left" && "text-left"} ${caption.topTextAlign === "center" && "text-center"} ${caption.topTextAlign === "right" && "text-right"} ${caption.topTextVerticalAlign === "top" && "items-start"} ${caption.topTextVerticalAlign === "center" && "items-center"} ${caption.topTextVerticalAlign === "bottom" && "items-end"} ${caption.topTextHorizontalAlign === "left" && "justify-start"} ${caption.topTextHorizontalAlign === "center" && "justify-center"} ${caption.topTextHorizontalAlign === "right" && "justify-end"} z-20 leading-none text-white`}
        style={{
          fontSize: `${caption.topTextSize}px`,
          paddingTop: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingBottom: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingLeft: `${caption.xPadding + caption.strokeWidth / 2}px`,
          paddingRight: `${caption.xPadding + caption.strokeWidth / 2}px`,
          height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
          width: `${divWidth}px`,
        }}
      >
        {caption.topText}
      </span>
      <span
        className={`${impact.className} ${caption.uppercase && "uppercase"} ${caption.bold && "font-bold"} ${caption.italic && "italic"} absolute left-0 top-0 ${caption.bottomTextAlign === "left" && "text-left"} ${caption.bottomTextAlign === "center" && "text-center"} ${caption.bottomTextAlign === "right" && "text-right"} flex ${caption.bottomTextVerticalAlign === "top" && "items-start"} ${caption.bottomTextVerticalAlign === "center" && "items-center"} ${caption.bottomTextVerticalAlign === "bottom" && "items-end"} ${caption.bottomTextHorizontalAlign === "left" && "justify-start"} ${caption.bottomTextHorizontalAlign === "center" && "justify-center"} ${caption.bottomTextHorizontalAlign === "right" && "justify-end"} z-30 leading-none text-white`}
        style={{
          WebkitTextFillColor: "transparent",
          WebkitTextStrokeWidth: `${caption.strokeWidth}px`,
          WebkitTextStrokeColor: "black",
          fontSize: `${caption.bottomTextSize}px`,
          paddingTop: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingBottom: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingLeft: `${caption.xPadding + caption.strokeWidth / 2}px`,
          paddingRight: `${caption.xPadding + caption.strokeWidth / 2}px`,
          height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
          width: `${divWidth}px`,
        }}
      >
        {caption.bottomText}
      </span>
      <span
        className={`${impact.className} ${caption.uppercase ? "uppercase" : null} ${caption.bold ? "font-bold" : null} ${caption.italic ? "italic" : null} absolute left-0 top-0 ${caption.bottomTextAlign === "left" ? "text-left" : ""} ${caption.bottomTextAlign === "center" && "text-center"} ${caption.bottomTextAlign === "right" && "text-right"} flex ${caption.bottomTextVerticalAlign === "top" && "items-start"} ${caption.bottomTextVerticalAlign === "center" && "items-center"} ${caption.bottomTextVerticalAlign === "bottom" && "items-end"} ${caption.bottomTextHorizontalAlign === "left" && "justify-start"} ${caption.bottomTextHorizontalAlign === "center" && "justify-center"} ${caption.bottomTextHorizontalAlign === "right" && "justify-end"} z-40 leading-none text-white`}
        style={{
          fontSize: `${caption.bottomTextSize}px`,
          paddingTop: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingBottom: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingLeft: `${caption.xPadding + caption.strokeWidth / 2}px`,
          paddingRight: `${caption.xPadding + caption.strokeWidth / 2}px`,
          height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
          width: `${divWidth}px`,
        }}
      >
        {caption.bottomText}
      </span>
    </Link>
  ) : (
    <div
      className="relative h-full w-fit overflow-hidden"
      style={{
        height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
      }}
    >
      <div
        className="bg-white"
        style={{
          height: `${caption.whiteSpace}px`,
          width: `${divWidth}px`,
        }}
      />

      <div ref={divRef} className="z-0">
        <CloudinaryImage
          publicId={caption.imageId}
          width={width}
          height={height}
          className="max-h-[400px] w-auto"
        />
      </div>

      <div
        className="bg-white"
        style={{
          height: `${caption.whiteSpace}px`,
          width: `${divWidth}px`,
        }}
      />
      <span
        className={`${impact.className} ${caption.uppercase && "uppercase"} ${caption.bold && "font-bold"} ${caption.italic && "italic"} absolute left-0 top-0 flex ${caption.topTextAlign === "left" && "text-left"} ${caption.topTextAlign === "center" && "text-center"} ${caption.topTextAlign === "right" && "text-right"} ${caption.topTextVerticalAlign === "top" && "items-start"} ${caption.topTextVerticalAlign === "center" && "items-center"} ${caption.topTextVerticalAlign === "bottom" && "items-end"} ${caption.topTextHorizontalAlign === "left" && "justify-start"} ${caption.topTextHorizontalAlign === "center" && "justify-center"} ${caption.topTextHorizontalAlign === "right" && "justify-end"} z-10 leading-none text-white`}
        style={{
          WebkitTextFillColor: "transparent",
          WebkitTextStrokeWidth: `${caption.strokeWidth}px`,
          WebkitTextStrokeColor: "black",
          fontSize: `${caption.topTextSize}px`,
          paddingTop: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingBottom: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingLeft: `${caption.xPadding + caption.strokeWidth / 2}px`,
          paddingRight: `${caption.xPadding + caption.strokeWidth / 2}px`,
          height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
          width: `${divWidth}px`,
        }}
      >
        {caption.topText}
      </span>
      <span
        className={`${impact.className} ${caption.uppercase && "uppercase"} ${caption.bold && "font-bold"} ${caption.italic && "italic"} absolute left-0 top-0 flex ${caption.topTextAlign === "left" && "text-left"} ${caption.topTextAlign === "center" && "text-center"} ${caption.topTextAlign === "right" && "text-right"} ${caption.topTextVerticalAlign === "top" && "items-start"} ${caption.topTextVerticalAlign === "center" && "items-center"} ${caption.topTextVerticalAlign === "bottom" && "items-end"} ${caption.topTextHorizontalAlign === "left" && "justify-start"} ${caption.topTextHorizontalAlign === "center" && "justify-center"} ${caption.topTextHorizontalAlign === "right" && "justify-end"} z-20 leading-none text-white`}
        style={{
          fontSize: `${caption.topTextSize}px`,
          paddingTop: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingBottom: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingLeft: `${caption.xPadding + caption.strokeWidth / 2}px`,
          paddingRight: `${caption.xPadding + caption.strokeWidth / 2}px`,
          height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
          width: `${divWidth}px`,
        }}
      >
        {caption.topText}
      </span>
      <span
        className={`${impact.className} ${caption.uppercase && "uppercase"} ${caption.bold && "font-bold"} ${caption.italic && "italic"} absolute left-0 top-0 ${caption.bottomTextAlign === "left" && "text-left"} ${caption.bottomTextAlign === "center" && "text-center"} ${caption.bottomTextAlign === "right" && "text-right"} flex ${caption.bottomTextVerticalAlign === "top" && "items-start"} ${caption.bottomTextVerticalAlign === "center" && "items-center"} ${caption.bottomTextVerticalAlign === "bottom" && "items-end"} ${caption.bottomTextHorizontalAlign === "left" && "justify-start"} ${caption.bottomTextHorizontalAlign === "center" && "justify-center"} ${caption.bottomTextHorizontalAlign === "right" && "justify-end"} z-30 leading-none text-white`}
        style={{
          WebkitTextFillColor: "transparent",
          WebkitTextStrokeWidth: `${caption.strokeWidth}px`,
          WebkitTextStrokeColor: "black",
          fontSize: `${caption.bottomTextSize}px`,
          paddingTop: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingBottom: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingLeft: `${caption.xPadding + caption.strokeWidth / 2}px`,
          paddingRight: `${caption.xPadding + caption.strokeWidth / 2}px`,
          height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
          width: `${divWidth}px`,
        }}
      >
        {caption.bottomText}
      </span>
      <span
        className={`${impact.className} ${caption.uppercase ? "uppercase" : null} ${caption.bold ? "font-bold" : null} ${caption.italic ? "italic" : null} absolute left-0 top-0 ${caption.bottomTextAlign === "left" ? "text-left" : ""} ${caption.bottomTextAlign === "center" && "text-center"} ${caption.bottomTextAlign === "right" && "text-right"} flex ${caption.bottomTextVerticalAlign === "top" && "items-start"} ${caption.bottomTextVerticalAlign === "center" && "items-center"} ${caption.bottomTextVerticalAlign === "bottom" && "items-end"} ${caption.bottomTextHorizontalAlign === "left" && "justify-start"} ${caption.bottomTextHorizontalAlign === "center" && "justify-center"} ${caption.bottomTextHorizontalAlign === "right" && "justify-end"} z-40 leading-none text-white`}
        style={{
          fontSize: `${caption.bottomTextSize}px`,
          paddingTop: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingBottom: `${caption.yPadding + caption.strokeWidth / 2}px`,
          paddingLeft: `${caption.xPadding + caption.strokeWidth / 2}px`,
          paddingRight: `${caption.xPadding + caption.strokeWidth / 2}px`,
          height: `${caption.whiteSpace ? `${divHeight + caption.whiteSpace * 2}px` : `${divHeight}px`}`,
          width: `${divWidth}px`,
        }}
      >
        {caption.bottomText}
      </span>
    </div>
  );
};
export default CaptionDisplay;
