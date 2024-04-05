"use client";

import Link from "next/link";
import CloudinaryImage from "./Dashboard/CloudinaryImage";

const ImageColumnGenerator = ({
  images,
}: {
  images: { resources: { public_id: string }[] };
}) => {
  const getColumnArrays = (maxColumns: number) => {
    const columns = [];
    for (let i = 0; i < maxColumns; i++) {
      columns.push(getColumns(i, maxColumns));
    }
    return columns;
  };

  const getColumns = (colIndex: number, maxColumns: number) => {
    return images.resources.filter(
      (resource, index) => index % maxColumns === colIndex,
    );
  };

  return (
    <>
      <div className={`hidden w-full grid-cols-4 gap-2 xl:grid`}>
        {getColumnArrays(4).map((column, index) => (
          <div key={index} className="flex w-fit flex-col gap-4">
            {column.map((image) => (
              <Link
                key={image.public_id}
                href={`/images/${image.public_id}`}
                className="group w-fit overflow-hidden"
              >
                <CloudinaryImage
                  key={image.public_id}
                  publicId={image.public_id}
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className={`hidden w-full grid-cols-3 gap-2 lg:grid xl:hidden`}>
        {getColumnArrays(3).map((column, index) => (
          <div key={index} className="flex w-fit flex-col gap-4">
            {column.map((image) => (
              <Link
                key={image.public_id}
                href={`/images/${image.public_id}`}
                className="group w-fit overflow-hidden"
              >
                <CloudinaryImage
                  key={image.public_id}
                  publicId={image.public_id}
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className={`hidden w-full grid-cols-2 gap-2 sm:grid lg:hidden`}>
        {getColumnArrays(2).map((column, index) => (
          <div key={index} className="flex w-fit flex-col gap-4">
            {column.map((image) => (
              <Link
                key={image.public_id}
                href={`/images/${image.public_id}`}
                className="group w-fit overflow-hidden"
              >
                <CloudinaryImage
                  key={image.public_id}
                  publicId={image.public_id}
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className={`grid w-full grid-cols-1 gap-2 sm:hidden`}>
        {getColumnArrays(1).map((column, index) => (
          <div key={index} className="flex w-fit flex-col gap-4">
            {column.map((image) => (
              <Link
                key={image.public_id}
                href={`/images/${image.public_id}`}
                className="group w-fit overflow-hidden"
              >
                <CloudinaryImage
                  key={image.public_id}
                  publicId={image.public_id}
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
export default ImageColumnGenerator;
