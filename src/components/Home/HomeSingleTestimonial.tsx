import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { Badge } from "../ui/badge";

const user: {
  image: string | null;
  name: string;
} = {
  image: "/pikachu.jpg",
  name: "Pika Chu",
};
const testimonial =
  "This is my favorite SaaS of 2024! Why can't I stop using it??";
const badgeText = "Pro Member";

const HomeSingleTestimonial = () => {
  return (
    <section className="flex max-w-xs flex-col items-center gap-2 lg:items-start">
      {/* <FaQuoteLeft className="text-green-500/40 hidden lg:block" size={22} /> */}
      <span className="flex items-center gap-4 text-left font-semibold">
        <FaQuoteLeft className="block text-primary" size={42} />
        {testimonial}
      </span>
      <div className="flex items-center gap-2">
        {user.image ? (
          <>
            <Image
              src={user.image}
              width={30}
              height={30}
              alt={user.name}
              className="rounded-full"
              priority={true}
            />
            <span className="">{user.name}</span>
          </>
        ) : (
          <span className="text-sm">-{user.name}</span>
        )}

        <Badge variant={"outline"} className="border-primary text-primary">
          {badgeText}
        </Badge>
      </div>
    </section>
  );
};
export default HomeSingleTestimonial;
