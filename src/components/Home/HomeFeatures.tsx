import { HOME_FEATURES } from "@/lib/constants";
import HeroImageDescription from "./HomeImageDescription";

const subtitle = "These Features are Necessary, Get Them Now";

const HomeFeatures = () => {
  if (HOME_FEATURES.length === 0) return null;

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-16 py-24 lg:gap-24">
      {/* <div className="mx-auto flex flex-col gap-2">
        <h3 className="title">Features</h3>
        <p className="subtitle">{subtitle}</p>
      </div> */}

      <div className="flex flex-col gap-20">
        {HOME_FEATURES.map((feature, index) =>
          index % 2 === 0 ? (
            <HeroImageDescription
              imageLeft={true}
              imageSrc={feature.imageSrc}
              imageName={feature.imageName}
              imageSubtitle={feature.imageSubtitle}
              imageDescription={feature.imageDescription}
            />
          ) : (
            <HeroImageDescription
              imageLeft={false}
              imageSrc={feature.imageSrc}
              imageName={feature.imageName}
              imageSubtitle={feature.imageSubtitle}
              imageDescription={feature.imageDescription}
            />
          ),
        )}
      </div>
    </section>
  );
};
export default HomeFeatures;
