import { DEMO } from "@/lib/constants";

const HomeDemo = () => {
  return (
    <section
      id="demo"
      className={`mx-auto flex w-full max-w-7xl flex-col gap-8 py-24`}
    >
      <div className="mx-auto flex flex-col gap-2">
        {/* <h3 className="title">{DEMO.title}</h3> */}
        <p className="subtitle">{DEMO.subtitle}</p>
      </div>

      <iframe
        src={DEMO.videoLink}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="mx-auto aspect-video w-full max-w-3xl"
      ></iframe>
    </section>
  );
};
export default HomeDemo;
