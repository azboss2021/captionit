import HomeNavbar from "@/components/Home/HomeNavbar";
import HomeHero from "@/components/Home/HomeHero";
import HomeHorizontalScroll from "@/components/Home/HomeHorizontalScroll";
import HomeFAQ from "@/components/Home/HomeFAQ";
import HomeCTA from "@/components/Home/HomeCTA";
import HomeFooter from "@/components/Home/HomeFooter";
import HomeDemo from "@/components/Home/HomeDemo";
import Pricing from "@/components/Home/HomePricing";
import HomeSideBySide from "@/components/Home/HomeSideBySide";
import HomeFeatures from "@/components/Home/HomeFeatures";
import HomeBackground from "@/components/Home/HomeBackground";
import HomeTestimonialWall from "@/components/Home/HomeTestimonialWall";
import HomeTestimonials from "@/components/Home/HomeTestimonials";
import HomeSingleTestimonial from "@/components/Home/HomeSingleTestimonial";
import HeroImageDescription from "@/components/Home/HeroImageDescription";

import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import HomeEmailSection from "@/components/Home/HomeEmailSection";

const HomePage = async () => {
  const session = await getServerSession(options);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex flex-col">
      {/* <HomeBackground /> */}

      <div className="border-b bg-background">
        <HomeNavbar />
      </div>

      <HomeHero />

      {/* <section className="bg-primary/5"> */}
      <HomeDemo />
      {/* </section> */}

      <HomeFeatures />

      <Pricing />
      <HomeFAQ />

      {/* <section className="bg-primary/5"> */}
      <HomeCTA />
      {/* </section> */}

      <div className="border-t bg-background">
        <HomeFooter />
      </div>
    </main>
  );
};
export default HomePage;
