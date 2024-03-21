import { DISCOUNT, ONE_TIME_PLAN } from "@/lib/constants";
import Checkout from "./Checkout";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { Badge } from "./ui/badge";
import HomeCTAButton from "./Home/HomeCTAButton";

const OneTimePricing = ({ id }: { id?: string }) => {
  return (
    <div
      className={`relative mx-auto w-full max-w-xs rounded-lg border px-6 py-6 ${ONE_TIME_PLAN.bestChoice && "border-2 border-primary"} bg-background`}
    >
      {ONE_TIME_PLAN.bestChoice && (
        <div className="absolute -top-3 left-[124px] rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
          POPULAR
        </div>
      )}
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-semibold text-muted-foreground">
            {ONE_TIME_PLAN.name}
          </span>
          {ONE_TIME_PLAN.useBadge && DISCOUNT > 0 && (
            <Badge variant={ONE_TIME_PLAN.bestChoice ? "default" : "secondary"}>
              Save $
              {(ONE_TIME_PLAN.price - ONE_TIME_PLAN.price * (1 - DISCOUNT)) %
                100 ===
              0
                ? (ONE_TIME_PLAN.price - ONE_TIME_PLAN.price * (1 - DISCOUNT)) /
                  100
                : (
                    (ONE_TIME_PLAN.price -
                      ONE_TIME_PLAN.price * (1 - DISCOUNT)) /
                    100
                  ).toFixed(2)}
            </Badge>
          )}
        </div>

        <div className="flex items-end justify-center">
          {!ONE_TIME_PLAN.useBadge && DISCOUNT > 0 && (
            <span className="mr-2 text-lg font-bold text-muted-foreground line-through">
              $
              {ONE_TIME_PLAN.price % 100 === 0
                ? ONE_TIME_PLAN.price / 100
                : (ONE_TIME_PLAN.price / 100).toFixed(2)}
            </span>
          )}
          <span className="text-4xl font-extrabold tracking-tight">
            $
            {(ONE_TIME_PLAN.price * (1 - DISCOUNT)) % 100 === 0
              ? (ONE_TIME_PLAN.price * (1 - DISCOUNT)) / 100
              : ((ONE_TIME_PLAN.price * (1 - DISCOUNT)) / 100).toFixed(2)}
          </span>
        </div>

        {ONE_TIME_PLAN.description && (
          <span className="text-center text-muted-foreground">
            {ONE_TIME_PLAN.description}
          </span>
        )}

        {ONE_TIME_PLAN.inclusions.length > 0 && (
          <div className="mb-2 mt-2 flex flex-col items-center gap-1.5">
            {ONE_TIME_PLAN.inclusions.map((inclusion, index) => (
              <div className="flex items-center gap-2" key={index}>
                {inclusion.isIncluded ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaCircleXmark className="text-red-500" />
                )}
                <span className="text-muted-foreground">{inclusion.label}</span>
              </div>
            ))}
          </div>
        )}

        {id ? (
          <Checkout
            product={ONE_TIME_PLAN.name}
            amount={
              parseFloat(
                ((ONE_TIME_PLAN.price * (1 - DISCOUNT)) / 100).toFixed(2),
              ) * 100
            }
            buyerId={id}
            subscriptionPlan={ONE_TIME_PLAN.name}
          />
        ) : (
          <HomeCTAButton className="w-full px-0" />
        )}
      </div>
    </div>
  );
};
export default OneTimePricing;
