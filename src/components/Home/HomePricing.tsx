import { cn } from "@/lib/utils";
import DiscountLabel from "../DiscountLabel";
import OneTimePricing from "../OneTimePricing";
import CreditPricing from "../CreditPricing";
import SubscriptionPricing from "../SubscriptionPricing";
import { PRICING_SUBTITLE, PRODUCT_TYPE } from "@/lib/constants";

const HomePricing = async ({ className }: { className?: string }) => {
  return (
    <section
      id="pricing"
      className={cn(
        `mx-auto flex w-full max-w-7xl flex-col gap-16 px-8 py-24`,
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto flex flex-col gap-2">
          {/* <h3 className="title">Pricing</h3> */}
          <p className="subtitle">{PRICING_SUBTITLE}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8">
        <section className="pb-16">
          {PRODUCT_TYPE === "subscription" && (
            <div className="flex flex-col gap-8">
              <DiscountLabel />
              <SubscriptionPricing />
            </div>
          )}
          {PRODUCT_TYPE === "credits" && (
            <div className="flex flex-col gap-8">
              <DiscountLabel />
              <CreditPricing />
            </div>
          )}
          {PRODUCT_TYPE === "one_time" && (
            <div className="flex flex-col gap-8">
              <DiscountLabel />
              <OneTimePricing />
            </div>
          )}
        </section>
      </div>
    </section>
  );
};
export default HomePricing;
