import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getUserByEmail } from "@/lib/actions";
import { PRODUCT_TYPE } from "@/lib/constants";
import SubscriptionPricing from "./SubscriptionPricing";
import SubscriptionPlan from "./SubscriptionPlan";
import CreditPlan from "./CreditPlan";
import CreditPricing from "./CreditPricing";
import OneTimePricing from "./OneTimePricing";
import DiscountLabel from "./DiscountLabel";

const Pricing = async () => {
  const session = await getServerSession(options);
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <section className="pb-16">
      {PRODUCT_TYPE === "subscription" && (
        <div className="flex flex-col gap-8">
          <SubscriptionPlan
            id={user._id}
            plan={user.plan}
            subscriptionId={user.subscriptionId}
          />
          <DiscountLabel />
          <SubscriptionPricing id={user._id} subscriptionPlan={user.plan} />
        </div>
      )}
      {PRODUCT_TYPE === "credits" && (
        <div className="flex flex-col gap-8">
          <CreditPlan credits={user.credits} />
          <DiscountLabel />
          <CreditPricing id={user._id} />
        </div>
      )}
      {PRODUCT_TYPE === "one_time" && (
        <div className="flex flex-col gap-8">
          <DiscountLabel />
          <OneTimePricing id={user._id} />
        </div>
      )}
    </section>
  );
};
export default Pricing;
