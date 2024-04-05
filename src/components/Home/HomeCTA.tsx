import HomeCTAButton from "./HomeCTAButton";

const ctaMain = "Generate an image and CaptionIt!";
// const ctaDescription = "Generate an image and CaptionIt!";

const HomeCTA = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-8 py-24">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold tracking-tight lg:text-5xl">
          {ctaMain}
        </h2>
        {/* <p className="text-center text-lg text-muted-foreground">
          {ctaDescription}
        </p> */}
      </div>
      <HomeCTAButton />
    </section>
  );
};
export default HomeCTA;
