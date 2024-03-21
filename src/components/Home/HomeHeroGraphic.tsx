import Image from "next/image";

// EDIT THESE
const image = {
  link: "/pikachu.jpg",
  alt: "",
  width: 1080,
  height: 1080,
};

const HomeHeroGraphic = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <Image
        src={image.link}
        width={image.width}
        height={image.height}
        alt={image.alt}
        className="mx-auto ml-auto w-full max-w-xl rounded-xl"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};
export default HomeHeroGraphic;
