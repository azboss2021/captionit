import Image from "next/image";
import { FaStar } from "react-icons/fa";

// EDIT THESE
const users = [
  {
    image: "/pikachu.jpg",
    id: "a",
  },
  {
    image: "/pikachu.jpg",
    id: "b",
  },
  {
    image: "/pikachu.jpg",
    id: "c",
  },
  {
    image: "/pikachu.jpg",
    id: "d",
  },
  {
    image: "/pikachu.jpg",
    id: "e",
  },
];
const userCount = 80;

const HeroUserCount = () => {
  return (
    <div className="flex flex-col items-center gap-2 lg:mr-auto lg:flex-row lg:gap-4">
      <div className="flex flex-grow-0 -space-x-4">
        {users.map((user) => (
          <Image
            src={user.image}
            width={45}
            height={45}
            alt={user.image}
            className="rounded-full border-[3px] border-background"
            key={user.id}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-1 lg:items-start">
        <div className="flex space-x-0.5 text-yellow-400">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div>
          <span className="font-bold">{userCount}</span> users are using this
          Saas!
        </div>
      </div>
    </div>
  );
};
export default HeroUserCount;
