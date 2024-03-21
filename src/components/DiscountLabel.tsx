import { DISCOUNT } from "@/lib/constants";
import { FaGift } from "react-icons/fa";

const DiscountLabel = () => {
  return (
    DISCOUNT > 0 && (
      <span className="flex w-full items-center justify-center gap-2 text-center">
        <FaGift className="animate-pulse text-green-500" />{" "}
        <span>Limited Time Only - {DISCOUNT * 100}% Discount</span>
      </span>
    )
  );
};
export default DiscountLabel;
