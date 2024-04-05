"use client";

import { useEffect, useRef, useState } from "react";
import CloudinaryImage from "./Dashboard/CloudinaryImage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaChevronDown,
  FaChevronUp,
  FaGears,
  FaImage,
} from "react-icons/fa6";
import { Switch } from "./ui/switch";
import LoadingButton from "./LoadingButton";
import { FaUndo } from "react-icons/fa";
import {
  MdAlignHorizontalCenter,
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdAlignVerticalBottom,
  MdAlignVerticalCenter,
  MdAlignVerticalTop,
} from "react-icons/md";
import { impact } from "@/lib/fonts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { createCaption } from "@/lib/actions/caption.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ImageCreation = ({
  id,
  width,
  height,
  userId,
  captionCount,
}: {
  id: string;
  width: number;
  height: number;
  userId: string;
  captionCount: number;
}) => {
  const [topText, setTopText] = useState("Top Text");
  const [bottomText, setBottomText] = useState("Bottom Text");
  const [strokeWidth, setStrokeWidth] = useState(8);
  const [topTextSize, setTopTextSize] = useState(36);
  const [bottomTextSize, setBottomTextSize] = useState(36);
  const [yPadding, setYPadding] = useState(4);
  const [xPadding, setXPadding] = useState(8);
  const [topTextAlign, setTopTextAlign] = useState<"center" | "left" | "right">(
    "center",
  );
  const [bottomTextAlign, setBottomTextAlign] = useState<
    "center" | "left" | "right"
  >("center");
  const [topTextVerticalAlign, setTopTextVerticalAlign] = useState<
    "center" | "top" | "bottom"
  >("top");
  const [bottomTextVerticalAlign, setBottomTextVerticalAlign] = useState<
    "center" | "top" | "bottom"
  >("bottom");
  const [topTextHorizontalAlign, setTopTextHorizontalAlign] = useState<
    "center" | "left" | "right"
  >("center");
  const [bottomTextHorizontalAlign, setBottomTextHorizontalAlign] = useState<
    "center" | "left" | "right"
  >("center");
  const [font, setFont] = useState("Impact");
  const [italic, setItalic] = useState(false);
  const [bold, setBold] = useState(false);
  const [uppercase, setUppercase] = useState(true);
  const [whiteSpace, setWhiteSpace] = useState(0);

  const router = useRouter();

  const minWhiteSpace = 0;
  const maxWhiteSpace = 200;
  const minXPadding = 0;
  const minYPadding = 0;
  const maxXPadding = 100;
  const maxYPadding = 100;
  const minStroke = 0;
  const maxStroke = 30;
  const minTextSize = 5;
  const maxTextSize = 150;

  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number>(0.0);
  const [divWidth, setDivWidth] = useState<number>(0.0);
  const [loading, setLoading] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (topText.length > 1000 || bottomText.length > 1000) {
      toast.error("Text length must not exceed 1000 characters");
      setLoading(false);
      return;
    }

    if (topText.length === 0 && bottomText.length === 0) {
      toast.error("Text must not be empty");
      setLoading(false);
      return;
    }

    if (captionCount >= 5) {
      toast.error("Cannot create more than 10 captions per day");
      setLoading(false);
      return;
    }

    const caption = await createCaption({
      imageId: id,
      userId,
      caption: {
        topText,
        bottomText,
        strokeWidth,
        topTextSize,
        bottomTextSize,
        yPadding,
        xPadding,
        whiteSpace,
        topTextAlign,
        bottomTextAlign,
        topTextVerticalAlign,
        bottomTextVerticalAlign,
        topTextHorizontalAlign,
        bottomTextHorizontalAlign,
        font,
        italic,
        bold,
        uppercase,
      },
    });

    if (!caption.success) {
      toast.error("Something went wrong, Please try again");
      setLoading(false);
      return;
    }

    toast.success("Caption created successfully");

    router.push(`/caption/view/${caption.captionId}`);
  };

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

  const resetSettings = () => {
    setStrokeWidth(8);
    setTopTextSize(36);
    setBottomTextSize(36);
    setYPadding(4);
    setXPadding(8);
    setTopTextAlign("center");
    setBottomTextAlign("center");
    setTopTextVerticalAlign("top");
    setBottomTextVerticalAlign("bottom");
    setTopTextHorizontalAlign("center");
    setBottomTextHorizontalAlign("center");
    setFont("Impact");
    setItalic(false);
    setBold(false);
    setUppercase(true);
    setWhiteSpace(0);
  };

  const handleHorizontalAlign = (text: string, align: string) => {
    if (text === "top") {
      switch (align) {
        case "left":
          setTopTextHorizontalAlign("left");
          break;
        case "center":
          setTopTextHorizontalAlign("center");
          break;
        case "right":
          setTopTextHorizontalAlign("right");
          break;
      }
    } else if (text === "bottom") {
      switch (align) {
        case "left":
          setBottomTextHorizontalAlign("left");
          break;
        case "center":
          setBottomTextHorizontalAlign("center");
          break;
        case "right":
          setBottomTextHorizontalAlign("right");
          break;
      }
    }
  };

  const handleVerticalAlign = (text: string, align: string) => {
    if (text === "top") {
      switch (align) {
        case "top":
          setTopTextVerticalAlign("top");
          break;
        case "center":
          setTopTextVerticalAlign("center");
          break;
        case "bottom":
          setTopTextVerticalAlign("bottom");
          break;
      }
    } else if (text === "bottom") {
      switch (align) {
        case "top":
          setBottomTextVerticalAlign("top");
          break;
        case "center":
          setBottomTextVerticalAlign("center");
          break;
        case "bottom":
          setBottomTextVerticalAlign("bottom");
          break;
      }
    }
  };

  const handleTextAlign = (text: string, align: string) => {
    if (text === "top") {
      switch (align) {
        case "left":
          setTopTextAlign("left");
          break;
        case "center":
          setTopTextAlign("center");
          break;
        case "right":
          setTopTextAlign("right");
          break;
      }
    } else if (text === "bottom") {
      switch (align) {
        case "left":
          setBottomTextAlign("left");
          break;
        case "center":
          setBottomTextAlign("center");
          break;
        case "right":
          setBottomTextAlign("right");
          break;
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row">
      <div className="flex basis-1/2 flex-col gap-4">
        <Label htmlFor="topText" className="flex flex-col gap-2">
          Top Text
          <Input
            id="topText"
            placeholder="Top text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
        </Label>

        <Label htmlFor="bottomText" className="flex flex-col gap-2">
          Bottom Text
          <Input
            id="bottomText"
            placeholder="Bottom text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
        </Label>

        <Collapsible
          open={collapsibleOpen}
          onOpenChange={setCollapsibleOpen}
          className={`flex w-full flex-col ${collapsibleOpen ? "gap-4" : ""}`}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="secondary"
              className="flex items-center justify-between gap-2"
            >
              <h4 className="flex items-center gap-2">
                <FaGears size={18} /> Settings
              </h4>
              {collapsibleOpen ? <FaChevronUp /> : <FaChevronDown />}
              <span className="sr-only">Settings Toggle</span>
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <Label>Top Text Position</Label>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-end gap-0.5">
                  <Button
                    size="icon"
                    onClick={() => handleHorizontalAlign("top", "left")}
                    className="h-8 w-8 rounded-r-none"
                    variant={
                      topTextHorizontalAlign === "left" ? "default" : "outline"
                    }
                  >
                    <MdAlignHorizontalLeft />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleHorizontalAlign("top", "center")}
                    className="h-8 w-8 rounded-l-none rounded-r-none"
                    variant={
                      topTextHorizontalAlign === "center"
                        ? "default"
                        : "outline"
                    }
                  >
                    <MdAlignHorizontalCenter />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleHorizontalAlign("top", "right")}
                    className="h-8 w-8 rounded-l-none"
                    variant={
                      topTextHorizontalAlign === "right" ? "default" : "outline"
                    }
                  >
                    <MdAlignHorizontalRight />
                  </Button>
                </div>

                <div className="flex items-center justify-end gap-0.5">
                  <Button
                    size="icon"
                    onClick={() => handleVerticalAlign("top", "top")}
                    className="h-8 w-8 rounded-r-none"
                    variant={
                      topTextVerticalAlign === "top" ? "default" : "outline"
                    }
                  >
                    <MdAlignVerticalTop />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleVerticalAlign("top", "center")}
                    className="h-8 w-8 rounded-l-none rounded-r-none"
                    variant={
                      topTextVerticalAlign === "center" ? "default" : "outline"
                    }
                  >
                    <MdAlignVerticalCenter />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleVerticalAlign("top", "bottom")}
                    className="h-8 w-8 rounded-l-none"
                    variant={
                      topTextVerticalAlign === "bottom" ? "default" : "outline"
                    }
                  >
                    <MdAlignVerticalBottom />
                  </Button>
                </div>

                <div className="flex items-center justify-end gap-0.5">
                  <Button
                    size="icon"
                    onClick={() => handleTextAlign("top", "left")}
                    className="h-8 w-8 rounded-r-none"
                    variant={topTextAlign === "left" ? "default" : "outline"}
                  >
                    <FaAlignLeft />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleTextAlign("top", "center")}
                    className="h-8 w-8 rounded-l-none rounded-r-none"
                    variant={topTextAlign === "center" ? "default" : "outline"}
                  >
                    <FaAlignCenter />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleTextAlign("top", "right")}
                    className="h-8 w-8 rounded-l-none"
                    variant={topTextAlign === "right" ? "default" : "outline"}
                  >
                    <FaAlignRight />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <Label>Bottom Text Position</Label>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-end gap-0.5">
                  <Button
                    size="icon"
                    onClick={() => handleHorizontalAlign("bottom", "left")}
                    className="h-8 w-8 rounded-r-none"
                    variant={
                      bottomTextHorizontalAlign === "left"
                        ? "default"
                        : "outline"
                    }
                  >
                    <MdAlignHorizontalLeft />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleHorizontalAlign("bottom", "center")}
                    className="h-8 w-8 rounded-l-none rounded-r-none"
                    variant={
                      bottomTextHorizontalAlign === "center"
                        ? "default"
                        : "outline"
                    }
                  >
                    <MdAlignHorizontalCenter />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleHorizontalAlign("bottom", "right")}
                    className="h-8 w-8 rounded-l-none"
                    variant={
                      bottomTextHorizontalAlign === "right"
                        ? "default"
                        : "outline"
                    }
                  >
                    <MdAlignHorizontalRight />
                  </Button>
                </div>

                <div className="flex items-center justify-end gap-0.5">
                  <Button
                    size="icon"
                    onClick={() => handleVerticalAlign("bottom", "top")}
                    className="h-8 w-8 rounded-r-none"
                    variant={
                      bottomTextVerticalAlign === "top" ? "default" : "outline"
                    }
                  >
                    <MdAlignVerticalTop />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleVerticalAlign("bottom", "center")}
                    className="h-8 w-8 rounded-l-none rounded-r-none"
                    variant={
                      bottomTextVerticalAlign === "center"
                        ? "default"
                        : "outline"
                    }
                  >
                    <MdAlignVerticalCenter />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleVerticalAlign("bottom", "bottom")}
                    className="h-8 w-8 rounded-l-none"
                    variant={
                      bottomTextVerticalAlign === "bottom"
                        ? "default"
                        : "outline"
                    }
                  >
                    <MdAlignVerticalBottom />
                  </Button>
                </div>

                <div className="flex items-center justify-end gap-0.5">
                  <Button
                    size="icon"
                    onClick={() => handleTextAlign("bottom", "left")}
                    className="h-8 w-8 rounded-r-none"
                    variant={bottomTextAlign === "left" ? "default" : "outline"}
                  >
                    <FaAlignLeft />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleTextAlign("bottom", "center")}
                    className="h-8 w-8 rounded-l-none rounded-r-none"
                    variant={
                      bottomTextAlign === "center" ? "default" : "outline"
                    }
                  >
                    <FaAlignCenter />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleTextAlign("bottom", "right")}
                    className="h-8 w-8 rounded-l-none"
                    variant={
                      bottomTextAlign === "right" ? "default" : "outline"
                    }
                  >
                    <FaAlignRight />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="basis-2/3">Top Text Size (px)</Label>
              <Input
                placeholder="Top Text Size (px)"
                type="number"
                min={minTextSize}
                max={maxTextSize}
                value={topTextSize.toString()}
                className="basis-1/3"
                onChange={(e) => {
                  if (parseInt(e.target.value) > maxTextSize) {
                    setTopTextSize(maxTextSize);
                  } else if (
                    parseInt(e.target.value) < minTextSize ||
                    e.target.value.length === 0
                  ) {
                    setTopTextSize(minTextSize);
                  } else setTopTextSize(parseInt(e.target.value));
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="basis-2/3">Bottom Text Size (px)</Label>
              <Input
                placeholder="Bottom Text Size (px)"
                type="number"
                min={minTextSize}
                max={maxTextSize}
                value={bottomTextSize.toString()}
                className="basis-1/3"
                onChange={(e) => {
                  if (parseInt(e.target.value) > maxTextSize) {
                    setBottomTextSize(maxTextSize);
                  } else if (
                    parseInt(e.target.value) < minTextSize ||
                    e.target.value.length === 0
                  ) {
                    setBottomTextSize(minTextSize);
                  } else setBottomTextSize(parseInt(e.target.value));
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="basis-2/3">Stroke Width (px)</Label>
              <Input
                placeholder="Stroke Width (px)"
                type="number"
                min={minStroke}
                max={maxStroke}
                value={strokeWidth.toString()}
                className="basis-1/3"
                onChange={(e) => {
                  if (
                    parseInt(e.target.value) < minStroke ||
                    e.target.value.length === 0
                  ) {
                    setStrokeWidth(minStroke);
                  } else if (parseInt(e.target.value) > maxStroke) {
                    setStrokeWidth(maxStroke);
                  } else {
                    setStrokeWidth(parseInt(e.target.value));
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="basis-2/3">Top/Bottom Padding (px)</Label>
              <Input
                placeholder="Top/Bottom Padding (px)"
                type="number"
                min={minYPadding}
                max={maxYPadding}
                value={yPadding.toString()}
                className="basis-1/3"
                onChange={(e) => {
                  if (
                    parseInt(e.target.value) < minYPadding ||
                    e.target.value.length === 0
                  ) {
                    setYPadding(minYPadding);
                  } else if (parseInt(e.target.value) > maxYPadding) {
                    setYPadding(maxYPadding);
                  } else {
                    setYPadding(parseInt(e.target.value));
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="basis-2/3">Left/Right Padding (px)</Label>
              <Input
                placeholder="Left/Right Padding (px)"
                type="number"
                min={minXPadding}
                max={maxXPadding}
                value={xPadding.toString()}
                className="basis-1/3"
                onChange={(e) => {
                  if (
                    parseInt(e.target.value) < minXPadding ||
                    e.target.value.length === 0
                  ) {
                    setXPadding(minXPadding);
                  } else if (parseInt(e.target.value) > maxXPadding) {
                    setXPadding(maxXPadding);
                  } else {
                    setXPadding(parseInt(e.target.value));
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="basis-2/3">White Space (px)</Label>
              <Input
                placeholder="White Space (px)"
                type="number"
                min={minWhiteSpace}
                max={maxWhiteSpace}
                value={whiteSpace.toString()}
                className="basis-1/3"
                onChange={(e) => {
                  if (
                    parseInt(e.target.value) < minWhiteSpace ||
                    e.target.value.length === 0
                  ) {
                    setWhiteSpace(minWhiteSpace);
                  } else if (parseInt(e.target.value) > maxWhiteSpace) {
                    setWhiteSpace(maxWhiteSpace);
                  } else {
                    setWhiteSpace(parseInt(e.target.value));
                  }
                }}
              />
            </div>

            <Label
              htmlFor="italic"
              className="flex cursor-pointer items-center justify-between"
            >
              Italicize
              <Switch
                id="italic"
                checked={italic}
                onCheckedChange={() => setItalic((curr) => !curr)}
              />
            </Label>
            <Label
              htmlFor="bold"
              className="flex cursor-pointer items-center justify-between"
            >
              Bold
              <Switch
                id="bold"
                checked={bold}
                onCheckedChange={() => setBold((curr) => !curr)}
              />
            </Label>
            <Label
              htmlFor="uppercase"
              className="flex cursor-pointer items-center justify-between"
            >
              Uppercase
              <Switch
                id="uppercase"
                checked={uppercase}
                onCheckedChange={() => setUppercase((curr) => !curr)}
              />
            </Label>

            <Button
              className="flex gap-2"
              variant="destructive"
              onClick={resetSettings}
            >
              Reset to Default <FaUndo />
            </Button>
          </CollapsibleContent>
        </Collapsible>
        <LoadingButton
          loading={loading}
          className="flex gap-2"
          onClick={handleSubmit}
        >
          Generate Caption <FaImage />
        </LoadingButton>
      </div>

      <div
        className="relative box-content w-full max-w-[600px] border-2"
        style={{
          height: `${whiteSpace ? `${divHeight + whiteSpace * 2}px` : `${divHeight}px`}`,
        }}
      >
        <div
          className="bg-white"
          style={{
            height: `${whiteSpace}px`,
            width: `${divWidth}px`,
          }}
        />

        <div ref={divRef} className="z-0">
          <CloudinaryImage
            publicId={id}
            page={true}
            width={width}
            height={height}
          />
        </div>

        <div
          className="bg-white"
          style={{
            height: `${whiteSpace}px`,
            width: `${divWidth}px`,
          }}
        />
        <span
          className={`${impact.className} ${uppercase && "uppercase"} ${bold && "font-bold"} ${italic && "italic"} absolute left-0 top-0 flex ${topTextAlign === "left" && "text-left"} ${topTextAlign === "center" && "text-center"} ${topTextAlign === "right" && "text-right"} ${topTextVerticalAlign === "top" && "items-start"} ${topTextVerticalAlign === "center" && "items-center"} ${topTextVerticalAlign === "bottom" && "items-end"} ${topTextHorizontalAlign === "left" && "justify-start"} ${topTextHorizontalAlign === "center" && "justify-center"} ${topTextHorizontalAlign === "right" && "justify-end"} z-10 leading-none text-white`}
          style={{
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeWidth: `${strokeWidth}px`,
            WebkitTextStrokeColor: "black",
            fontSize: `${topTextSize}px`,
            paddingTop: `${yPadding + strokeWidth / 2}px`,
            paddingBottom: `${yPadding + strokeWidth / 2}px`,
            paddingLeft: `${xPadding + strokeWidth / 2}px`,
            paddingRight: `${xPadding + strokeWidth / 2}px`,
            height: `${whiteSpace ? `${divHeight + whiteSpace * 2}px` : `${divHeight}px`}`,
            width: `${divWidth}px`,
          }}
        >
          {topText}
        </span>
        <span
          className={`${impact.className} ${uppercase && "uppercase"} ${bold && "font-bold"} ${italic && "italic"} absolute left-0 top-0 flex ${topTextAlign === "left" && "text-left"} ${topTextAlign === "center" && "text-center"} ${topTextAlign === "right" && "text-right"} ${topTextVerticalAlign === "top" && "items-start"} ${topTextVerticalAlign === "center" && "items-center"} ${topTextVerticalAlign === "bottom" && "items-end"} ${topTextHorizontalAlign === "left" && "justify-start"} ${topTextHorizontalAlign === "center" && "justify-center"} ${topTextHorizontalAlign === "right" && "justify-end"} z-20 leading-none text-white`}
          style={{
            fontSize: `${topTextSize}px`,
            paddingTop: `${yPadding + strokeWidth / 2}px`,
            paddingBottom: `${yPadding + strokeWidth / 2}px`,
            paddingLeft: `${xPadding + strokeWidth / 2}px`,
            paddingRight: `${xPadding + strokeWidth / 2}px`,
            height: `${whiteSpace ? `${divHeight + whiteSpace * 2}px` : `${divHeight}px`}`,
            width: `${divWidth}px`,
          }}
        >
          {topText}
        </span>
        <span
          className={`${impact.className} ${uppercase && "uppercase"} ${bold && "font-bold"} ${italic && "italic"} absolute left-0 top-0 ${bottomTextAlign === "left" && "text-left"} ${bottomTextAlign === "center" && "text-center"} ${bottomTextAlign === "right" && "text-right"} flex ${bottomTextVerticalAlign === "top" && "items-start"} ${bottomTextVerticalAlign === "center" && "items-center"} ${bottomTextVerticalAlign === "bottom" && "items-end"} ${bottomTextHorizontalAlign === "left" && "justify-start"} ${bottomTextHorizontalAlign === "center" && "justify-center"} ${bottomTextHorizontalAlign === "right" && "justify-end"} z-30 leading-none text-white`}
          style={{
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeWidth: `${strokeWidth}px`,
            WebkitTextStrokeColor: "black",
            fontSize: `${bottomTextSize}px`,
            paddingTop: `${yPadding + strokeWidth / 2}px`,
            paddingBottom: `${yPadding + strokeWidth / 2}px`,
            paddingLeft: `${xPadding + strokeWidth / 2}px`,
            paddingRight: `${xPadding + strokeWidth / 2}px`,
            height: `${whiteSpace ? `${divHeight + whiteSpace * 2}px` : `${divHeight}px`}`,
            width: `${divWidth}px`,
          }}
        >
          {bottomText}
        </span>
        <span
          className={`${impact.className} ${uppercase ? "uppercase" : null} ${bold ? "font-bold" : null} ${italic ? "italic" : null} absolute left-0 top-0 ${bottomTextAlign === "left" ? "text-left" : ""} ${bottomTextAlign === "center" && "text-center"} ${bottomTextAlign === "right" && "text-right"} flex ${bottomTextVerticalAlign === "top" && "items-start"} ${bottomTextVerticalAlign === "center" && "items-center"} ${bottomTextVerticalAlign === "bottom" && "items-end"} ${bottomTextHorizontalAlign === "left" && "justify-start"} ${bottomTextHorizontalAlign === "center" && "justify-center"} ${bottomTextHorizontalAlign === "right" && "justify-end"} z-40 leading-none text-white`}
          style={{
            fontSize: `${bottomTextSize}px`,
            paddingTop: `${yPadding + strokeWidth / 2}px`,
            paddingBottom: `${yPadding + strokeWidth / 2}px`,
            paddingLeft: `${xPadding + strokeWidth / 2}px`,
            paddingRight: `${xPadding + strokeWidth / 2}px`,
            height: `${whiteSpace ? `${divHeight + whiteSpace * 2}px` : `${divHeight}px`}`,
            width: `${divWidth}px`,
          }}
        >
          {bottomText}
        </span>
      </div>
    </div>
  );
};
export default ImageCreation;
