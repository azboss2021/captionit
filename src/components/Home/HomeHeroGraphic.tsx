import Image from "next/image";

// EDIT THESE
const image = {
  link: "/HeroNoBg.png",
  alt: "Hero Image",
  width: 2000,
  height: 2000,
};

const HomeHeroGraphic = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <Image
        src={image.link}
        width={image.width}
        height={image.height}
        alt={image.alt}
        className="mx-auto ml-auto w-full rounded-xl"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};
export default HomeHeroGraphic;
