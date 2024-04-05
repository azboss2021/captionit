"use client";

import { CldImage } from "next-cloudinary";

const CloudinaryImage = ({
  publicId,
  page = false,
  width,
  height,
  className,
}: {
  publicId: string;
  page?: boolean;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <CldImage
      width={width ?? "400"}
      height={height ?? "300"}
      src={publicId}
      sizes="100vw"
      alt="generated image"
      priority={page}
      className={`${className ?? ""} object-contain`}
    />
  );
};
export default CloudinaryImage;
