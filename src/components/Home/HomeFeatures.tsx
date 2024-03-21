import HeroImageDescription from "./HeroImageDescription";

const subtitle = "These Features are Necessary, Get Them Now";

const HomeFeatures = () => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-16 py-24 lg:gap-24">
      {/* <div className="mx-auto flex flex-col gap-2">
        <h3 className="title">Features</h3>
        <p className="subtitle">{subtitle}</p>
      </div> */}
      <div className="flex flex-col gap-20">
        <HeroImageDescription
          imageLeft={true}
          imageSrc="/pikachu.jpg"
          imageName="Dashboard"
          imageSubtitle="Streamlined Project Oversight"
          imageDescription="Embrace the ease of navigation with our dashboard, your strategic command center for instant access to all your needs and resources."
        />
        <HeroImageDescription
          imageLeft={false}
          imageSrc="/pikachu.jpg"
          imageName="Dashboard"
          imageSubtitle="Streamlined Project Oversight"
          imageDescription="Embrace the ease of navigation with our dashboard, your strategic command center for instant access to all your needs and resources."
        />
        <HeroImageDescription
          imageLeft={true}
          imageSrc="/pikachu.jpg"
          imageName="Dashboard"
          imageSubtitle="Streamlined Project Oversight"
          imageDescription="Embrace the ease of navigation with our dashboard, your strategic command center for instant access to all your needs and resources."
        />
      </div>
    </section>
  );
};
export default HomeFeatures;
