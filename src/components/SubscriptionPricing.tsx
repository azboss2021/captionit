import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ANNUAL_DISCOUNT, DISCOUNT, SUBSCRIPTION_PLANS } from "@/lib/constants";
import { Badge } from "./ui/badge";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import Checkout from "./Checkout";
import HomeCTAButton from "./Home/HomeCTAButton";

const SubscriptionPricing = ({
  id,
  subscriptionPlan,
}: {
  id?: string;
  subscriptionPlan?: string;
}) => {
  return (
    <Tabs defaultValue="monthly" className="flex w-full flex-col items-center">
      <TabsList className="mb-4 w-full max-w-[400px]">
        <TabsTrigger value="monthly" className="flex-1">
          Monthly
        </TabsTrigger>
        <TabsTrigger value="yearly" className="flex-1">
          Yearly {ANNUAL_DISCOUNT > 0 && `(Save ${ANNUAL_DISCOUNT * 100}%)`}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="monthly">
        <section className="flex w-full flex-col justify-center gap-4 md:flex-row">
          {SUBSCRIPTION_PLANS.map((plan, index) => (
            <div
              className={`relative w-full max-w-xs rounded-lg border px-6 py-10 ${plan.bestChoice && "border-2 border-primary"} bg-background`}
              key={`price_card_${index}`}
            >
              {plan.bestChoice && (
                <div className="absolute -top-3 left-[124px] rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
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
                  <span className="ml-2 font-semibold">/ month</span>
                </div>

                {plan.description && (
                  <span className="text-muted-foreground">
                    {plan.description}
                  </span>
                )}

                <div className="mb-4 mt-4 flex flex-col gap-1.5">
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

                {id && subscriptionPlan ? (
                  <Checkout
                    product={plan.name}
                    amount={
                      parseFloat(
                        (
                          (plan.price *
                            (1 - DISCOUNT) *
                            (1 - ANNUAL_DISCOUNT)) /
                          100
                        ).toFixed(2),
                      ) * 100
                    }
                    buyerId={id}
                    monthly={true}
                    subscriptionPlan={subscriptionPlan}
                  />
                ) : (
                  <HomeCTAButton className="w-full px-0" />
                )}
              </div>
            </div>
          ))}
        </section>
      </TabsContent>
      <TabsContent value="yearly">
        <section className="flex flex-col gap-4 md:flex-row">
          {SUBSCRIPTION_PLANS.map((plan, index) => (
            <div
              className={`relative max-w-xs rounded-lg border px-6 py-10 ${plan.bestChoice && "border-2 border-primary"} bg-background`}
              key={`price_card_${index}`}
            >
              {plan.bestChoice && (
                <div className="absolute -top-3 left-[124px] rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                  POPULAR
                </div>
              )}
              <div className="flex flex-col gap-3">
                <div className="flex w-full items-center justify-between">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {plan.name}
                  </span>
                  {plan.useBadge && (
                    <Badge variant={plan.bestChoice ? "default" : "secondary"}>
                      Save $
                      {(plan.price * 12 -
                        plan.price *
                          12 *
                          (1 - DISCOUNT) *
                          (1 - ANNUAL_DISCOUNT)) %
                        100 ===
                      0
                        ? (plan.price * 12 -
                            plan.price *
                              12 *
                              (1 - DISCOUNT) *
                              (1 - ANNUAL_DISCOUNT)) /
                          100
                        : (
                            (plan.price * 12 -
                              plan.price *
                                12 *
                                (1 - DISCOUNT) *
                                (1 - ANNUAL_DISCOUNT)) /
                            100
                          ).toFixed(2)}
                    </Badge>
                  )}
                </div>

                <div>
                  {!plan.useBadge && (DISCOUNT > 0 || ANNUAL_DISCOUNT > 0) && (
                    <span className="mr-2 text-lg font-bold text-muted-foreground line-through">
                      $
                      {(plan.price * 12) % 100 === 0
                        ? (plan.price * 12) / 100
                        : ((plan.price * 12) / 100).toFixed(2)}
                    </span>
                  )}
                  <span className="text-4xl font-extrabold tracking-tight">
                    $
                    {(plan.price *
                      12 *
                      (1 - DISCOUNT) *
                      (1 - ANNUAL_DISCOUNT)) %
                      100 ===
                    0
                      ? (plan.price *
                          12 *
                          (1 - DISCOUNT) *
                          (1 - ANNUAL_DISCOUNT)) /
                        100
                      : (
                          (plan.price *
                            12 *
                            (1 - DISCOUNT) *
                            (1 - ANNUAL_DISCOUNT)) /
                          100
                        ).toFixed(2)}
                  </span>
                  <span className="ml-2 font-semibold">/ year</span>
                </div>

                {plan.description && (
                  <span className="text-muted-foreground">
                    {plan.description}
                  </span>
                )}

                <div className="mb-4 mt-4 flex flex-col gap-1.5">
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

                {id && subscriptionPlan ? (
                  <Checkout
                    product={plan.name}
                    amount={
                      parseFloat(
                        (
                          (plan.price *
                            12 *
                            (1 - DISCOUNT) *
                            (1 - ANNUAL_DISCOUNT)) /
                          100
                        ).toFixed(2),
                      ) * 100
                    }
                    buyerId={id}
                    monthly={false}
                    subscriptionPlan={subscriptionPlan}
                  />
                ) : (
                  <HomeCTAButton className="w-full px-0" />
                )}
              </div>
            </div>
          ))}
        </section>
      </TabsContent>
    </Tabs>
  );
};
export default SubscriptionPricing;
