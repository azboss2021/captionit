import { getSubscription, getTransactionBySubscriptionId } from "@/lib/actions";
import { convertToShortDate, getCurrencySymbol } from "@/lib/utils";
import LogoImage from "./LogoImage";
import SubscriptionButtons from "./SubscriptionButtons";
import { FaStar } from "react-icons/fa";

const SubscriptionPlan = async ({
  id,
  plan,
  subscriptionId,
}: {
  id: string;
  plan: string;
  subscriptionId?: string;
}) => {
  if (!subscriptionId || plan === "Free") {
    return (
      <section className="mx-auto flex w-full justify-between rounded-xl border-2 p-4">
        <div className="flex flex-col">
          <span className="text-sm">Your Plan</span>{" "}
          <div>
            <span className="text-3xl font-extrabold">{plan}</span>
          </div>
        </div>
        <LogoImage />
      </section>
    );
  }

  const subscription = await getSubscription(subscriptionId);
  const transaction = await getTransactionBySubscriptionId(subscriptionId);

  const price = (transaction.amount / 100).toFixed(2);
  const currencyType = subscription?.currency;
  const currencySymbol = currencyType
    ? getCurrencySymbol(currencyType.toUpperCase())
    : undefined;
  const interval = subscription?.items.data[0].plan.interval;
  const periodEnd = convertToShortDate(
    subscription?.current_period_end as number,
  );

  return (
    <section className="mx-auto flex w-full flex-col gap-1 rounded-xl border-2 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm">Your Plan</span>
        <LogoImage />
      </div>

      <span className="flex items-center gap-2 text-3xl font-extrabold">
        <FaStar /> {plan}
      </span>

      <div>
        <span className="font-bold">
          {currencySymbol ? currencySymbol : currencyType?.toUpperCase()}
          {price} / {interval}
        </span>
      </div>

      <div>
        {subscription?.cancel_at_period_end
          ? "Your plan ends on "
          : "Your plan renews on "}

        <span className="font-bold">{periodEnd}</span>
      </div>

      <SubscriptionButtons
        cancel={subscription?.cancel_at_period_end as boolean}
        periodEnd={periodEnd}
        subscriptionId={subscriptionId}
      />
    </section>
  );
};
export default SubscriptionPlan;
