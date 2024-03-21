import { CREDIT_PLANS, DISCOUNT } from "@/lib/constants";
import { Badge } from "./ui/badge";
import { FaCheckCircle, FaCoins } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import Checkout from "./Checkout";
import HomeCTAButton from "./Home/HomeCTAButton";

const CreditPricing = ({ id }: { id?: string }) => {
  return (
    <section className="flex w-full flex-col justify-center gap-4 md:flex-row">
      {CREDIT_PLANS.map((plan, index) => (
        <div
          className={`relative w-screen max-w-xs rounded-lg border px-6 py-10 ${plan.bestChoice && "border-2 border-primary"} bg-background`}
          key={`price_card_${index}`}
        >
          {plan.bestChoice && (
            <div className="absolute -top-3 left-[124px] rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-background">
              POPULAR
            </div>
          )}
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full items-center justify-between">
              <span className="text-lg font-semibold text-muted-foreground">
                {plan.name}
              </span>
              {plan.useBadge && (
                <Badge variant={plan.bestChoice ? "default" : "secondary"}>
                  Save $
                  {(plan.price - plan.price * (1 - DISCOUNT)) % 100 === 0
                    ? (plan.price - plan.price * (1 - DISCOUNT)) / 100
                    : (
                        (plan.price - plan.price * (1 - DISCOUNT)) /
                        100
                      ).toFixed(2)}
                </Badge>
              )}
            </div>

            <div>
              {!plan.useBadge && DISCOUNT > 0 && (
                <span className="mr-2 text-lg font-bold text-muted-foreground line-through">
                  $
                  {plan.price % 100 === 0
                    ? plan.price / 100
                    : (plan.price / 100).toFixed(2)}
                </span>
              )}
              <span className="text-4xl font-extrabold tracking-tight">
                $
                {(plan.price * (1 - DISCOUNT)) % 100 === 0
                  ? (plan.price * (1 - DISCOUNT)) / 100
                  : ((plan.price * (1 - DISCOUNT)) / 100).toFixed(2)}
              </span>
            </div>

            {plan.description && (
              <span className="text-muted-foreground">{plan.description}</span>
            )}

            {plan.credits && (
              <span className="mb-1 mt-1 flex items-center gap-2 text-3xl font-extrabold">
                <FaCoins /> {plan.credits}
              </span>
            )}

            {plan.inclusions.length > 0 && (
              <div className="mb-2 mt-2 flex flex-col gap-1.5">
                {plan.inclusions.map((inclusion, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    {inclusion.isIncluded ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaCircleXmark className="text-red-500" />
                    )}
                    <span className="text-muted-foreground">
                      {inclusion.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {id ? (
              <Checkout
                product={plan.name}
                amount={
                  parseFloat(((plan.price * (1 - DISCOUNT)) / 100).toFixed(2)) *
                  100
                }
                buyerId={id}
                credits={plan.credits}
              />
            ) : (
              <HomeCTAButton className="w-full px-4" />
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
export default CreditPricing;
