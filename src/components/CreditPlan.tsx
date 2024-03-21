import { FaCoins } from "react-icons/fa";
import LogoImage from "./LogoImage";

const CreditPlan = ({ credits }: { credits: number }) => {
  return (
    <section className="flex flex-col gap-2 rounded-xl border p-4">
      <div className="flex justify-between">
        <span className="text-sm">Credit Balance</span> <LogoImage />
      </div>
      <div className="flex items-center gap-4">
        <FaCoins size={28} />
        <span className="text-3xl font-extrabold">{credits}</span>
      </div>
    </section>
  );
};
export default CreditPlan;
