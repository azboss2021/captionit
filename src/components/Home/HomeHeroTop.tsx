import { SAAS_DESCRIPTION, SAAS_SLOGAN } from "@/lib/constants";
import HeroUserCount from "./HeroUserCount";
import HomeCTAButton from "./HomeCTAButton";
import HomeCTAExtraInfo from "./HomeCTAExtraInfo";
import HomeSingleTestimonial from "./HomeSingleTestimonial";

const HomeHeroTop = () => {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-10 text-center">
      {/* <HomeSingleTestimonial /> */}
      <h1 className="text-4xl font-bold tracking-tight lg:text-7xl">
        {SAAS_SLOGAN}
      </h1>

      <p className="w-full max-w-prose text-lg leading-relaxed text-muted-foreground">
        {SAAS_DESCRIPTION}
      </p>

      <div className="flex flex-col items-center gap-2 lg:items-start">
        <HomeCTAButton className="rounded-full px-12" />
        {/* <HomeCTAExtraInfo /> */}
      </div>

      {/* <HeroUserCount /> */}
    </div>
  );
};
export default HomeHeroTop;
