import { SIDE_BY_SIDE_BAD, SIDE_BY_SIDE_GOOD } from "@/lib/constants";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const subtitle = "Not enjoying the competitors?";

const HomeSideBySide = () => {
  if (!SIDE_BY_SIDE_GOOD || !SIDE_BY_SIDE_BAD) return null;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-16 p-8 py-24 lg:gap-24 lg:py-48">
      <div className="mx-auto flex flex-col gap-2">
        {/* <h3 className="title">Compare</h3> */}
        <p className="subtitle">{subtitle}</p>
      </div>
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="flex basis-1/2 flex-col gap-3 rounded-lg border border-red-500 bg-red-50 p-6 dark:bg-red-950">
          <h3 className="text-2xl font-bold">{SIDE_BY_SIDE_BAD.title}</h3>
          {SIDE_BY_SIDE_BAD.features.map((feature, index) => (
            <div
              key={`good_feature_${index}`}
              className="flex items-center gap-2 text-lg"
            >
              <FaCircleXmark className="text-red-500" /> {feature}
            </div>
          ))}
        </div>
        <div className="flex basis-1/2 flex-col gap-3 rounded-lg border border-green-500 bg-green-50 p-6 dark:bg-green-950">
          <h3 className="text-2xl font-extrabold">{SIDE_BY_SIDE_GOOD.title}</h3>
          {SIDE_BY_SIDE_GOOD.features.map((feature, index) => (
            <div
              key={`good_feature_${index}`}
              className="flex items-center gap-2 text-lg"
            >
              <FaCheckCircle className="text-green-500" /> {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HomeSideBySide;
