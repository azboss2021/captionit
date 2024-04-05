import Image from "next/image";

const ImageAuthorSection = ({
  authorImage,
  authorName,
}: {
  authorImage: string;
  authorName: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={authorImage}
        width={40}
        height={40}
        alt="profile image"
        className="rounded-full"
      />
      <span className="font-semibold">{authorName}</span>
    </div>
  );
};
export default ImageAuthorSection;
