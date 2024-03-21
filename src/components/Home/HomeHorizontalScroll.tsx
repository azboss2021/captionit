import Image from "next/image";

// EDIT THESE
const items = [
  {
    image: "/pikachu.jpg",
    alt: "image alt",
    width: 100,
    height: 100,
  },
  {
    image: "/pikachu.jpg",
    alt: "image alt",
    width: 150,
    height: 100,
  },
  {
    image: "/pikachu.jpg",
    alt: "image alt",
    width: 100,
    height: 100,
  },
  {
    image: "/pikachu.jpg",
    alt: "image alt",
    width: 125,
    height: 100,
  },
  {
    image: "/pikachu.jpg",
    alt: "image alt",
    width: 100,
    height: 100,
  },
  {
    image: "/pikachu.jpg",
    alt: "image alt",
    width: 200,
    height: 100,
  },
];
const speed = 25000;

const HomeHorizontalScroll = () => {
  return (
    <>
      <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-8 py-24">
        <h3 className="max-w-xl text-center text-xl font-bold">
          Featured on...
        </h3>

        <div className="absolute inset-y-0 left-0 z-10 w-1/5 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-1/5 bg-gradient-to-l from-background to-transparent" />

        <div className="relative mx-auto h-16 w-full overflow-hidden">
          <div className="absolute flex">
            <section
              className="flex"
              style={{ animation: `${speed}ms slide infinite linear` }}
            >
              {items.map(({ image, alt, width, height }, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={alt}
                  width={width}
                  height={height}
                  className="mx-8 max-w-36 object-cover grayscale"
                  draggable={false}
                />
              ))}
            </section>
            <section
              className="flex"
              style={{ animation: `${speed}ms slide infinite linear` }}
            >
              {items.map(({ image, alt, width, height }, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={alt}
                  width={width}
                  height={height}
                  className="mx-8 max-w-36 object-cover grayscale"
                  draggable={false}
                />
              ))}
            </section>
            <section
              className="flex"
              style={{ animation: `${speed}ms slide infinite linear` }}
            >
              {items.map(({ image, alt, width, height }, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={alt}
                  width={width}
                  height={height}
                  className="mx-8 max-w-36 object-cover grayscale"
                  draggable={false}
                />
              ))}
            </section>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomeHorizontalScroll;
