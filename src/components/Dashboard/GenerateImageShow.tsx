import Image from "next/image";

const GenerateImageShow = ({
  setPhase,
  image,
  size,
}: {
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  image: string;
  size: string;
}) => {
  return (
    <div>
      <Image
        src={image}
        alt="generated image"
        width={parseInt(size.split("x")[0], 10)}
        height={parseInt(size.split("x")[1], 10)}
      />
    </div>
  );
};
export default GenerateImageShow;
