import HomeHeroGraphic from "./HomeHeroGraphic";
import HomeHeroLeft from "./HomeHeroLeft";
import HomeHeroTop from "./HomeHeroTop";

const HomeHero = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-16 px-8 py-12 lg:flex-row lg:items-start lg:py-20">
      <HomeHeroLeft />
      <HomeHeroGraphic className="relative w-full basis-1/2 max-md:-m-4" />
    </div>

    // <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-16 px-8 py-12">
    //   <HomeHeroTop />
    //   <HomeHeroGraphic className="w-full" />
    // </div>
  );
};
export default HomeHero;
