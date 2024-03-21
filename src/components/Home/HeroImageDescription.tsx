import Image from "next/image";

const HeroImageDescription = ({
  imageLeft,
  imageName,
  imageSrc,
  imageSubtitle,
  imageDescription,
}: {
  imageLeft?: boolean;
  imageName?: string;
  imageSrc: string;
  imageSubtitle?: string;
  imageDescription: string;
}) => {
  return (
    <section className="flex flex-col items-center gap-4 px-8 lg:flex-row lg:gap-16">
      {imageLeft ? (
        <>
          <Image
            src={imageSrc}
            width={1920}
            height={1080}
            alt={imageName ?? "feature image"}
            className="aspect-video basis-3/5 rounded-xl object-cover"
          />
          <div className="flex basis-2/5 flex-col gap-2 text-left">
            <h3 className="font-semibold text-primary">{imageName}</h3>
            <p className="text-2xl font-bold">{imageSubtitle}</p>
            <p className="text-muted-foreground">{imageDescription}</p>
          </div>
        </>
      ) : (
        <>
          <div className="hidden basis-2/5 flex-col gap-2 text-left lg:flex">
            <h3 className="font-semibold text-primary">{imageName}</h3>
            <p className="text-2xl font-bold">{imageSubtitle}</p>
            <p className="text-muted-foreground">{imageDescription}</p>
          </div>
          <Image
            src={imageSrc}
            width={1920}
            height={1080}
            alt={imageName ?? "feature image"}
            className="aspect-video basis-2/5 rounded-xl object-cover lg:basis-3/5"
          />
          <div className="flex basis-3/5 flex-col gap-2 text-left lg:hidden">
            <h3 className="font-semibold text-primary">{imageName}</h3>
            <p className="text-2xl font-bold">{imageSubtitle}</p>
            <p className="text-muted-foreground">{imageDescription}</p>
          </div>
        </>
      )}
    </section>
  );
};
export default HeroImageDescription;
