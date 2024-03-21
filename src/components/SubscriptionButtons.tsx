"use client";

import { FaTimesCircle } from "react-icons/fa";
import SingleActionDialog from "./SingleActionDialog";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import LoadingButton from "./LoadingButton";
import { continueSubscription, endSubscription } from "@/lib/actions";
import { useRouter } from "next/navigation";

const SubscriptionButtons = ({
  cancel = false,
  periodEnd,
  subscriptionId,
}: {
  cancel: boolean;
  periodEnd: string;
  subscriptionId: string;
}) => {
  const [continueLoading, setContinueLoading] = useState(false);
  const [endLoading, setEndLoading] = useState(false);
  const [endSubscriptionDialogOpen, setEndSubscriptionDialogOpen] =
    useState(false);
  const router = useRouter();

  const handleContinueSubscription = async () => {
    setContinueLoading(true);
    await continueSubscription(subscriptionId);
    router.refresh();
    setContinueLoading(false);
    setEndSubscriptionDialogOpen(false);
  };

  const handleEndSubscription = async () => {
    setEndLoading(true);
    await endSubscription(subscriptionId);
    router.refresh();
    setEndLoading(false);
    setEndSubscriptionDialogOpen(false);
  };

  return (
    <div className="flex justify-end gap-2">
      {cancel ? (
        <LoadingButton
          loading={continueLoading}
          onClick={handleContinueSubscription}
          className="rounded-full font-semibold"
        >
          Continue Subscription <FaPlay className="ml-1" />
        </LoadingButton>
      ) : (
        <SingleActionDialog
          triggerButtonContent={
            <>
              End Subscription <FaTimesCircle className="ml-1" />
            </>
          }
          buttonClassName="rounded-full font-semibold"
          dialogTitle="End Subscription"
          dialogDescription={`This will end your subscription on ${periodEnd}. Doing this means you will lose your plan benefits.`}
          buttonContent="End Subscription"
          buttonAction={handleEndSubscription}
          open={endSubscriptionDialogOpen}
          onOpenChange={setEndSubscriptionDialogOpen}
          loading={endLoading}
        />
      )}
    </div>
  );
};
export default SubscriptionButtons;
