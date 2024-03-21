import { FaGift } from "react-icons/fa";

const sale = "%50 off";
const firstCount = 100;
const totalCustomers = 80;
const remainingCustomers = firstCount - totalCustomers;

const HomeCTAExtraInfo = () => {
  return (
    <div className="flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold md:text-base">
      <FaGift className="animate-pulse text-green-500" />
      <span>
        <span className="text-green-500">{sale}</span> for the first{" "}
        {firstCount} customers! ({remainingCustomers} left)
      </span>
    </div>
  );
};
export default HomeCTAExtraInfo;
