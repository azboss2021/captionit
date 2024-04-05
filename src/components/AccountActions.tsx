"use client";

import SingleActionDialog from "./SingleActionDialog";
import { FaEnvelope, FaTimesCircle, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  addMailSubscriber,
  checkMailSubscribed,
  deleteUser,
  removeMailSubscriber,
} from "@/lib/actions";
import { signOut } from "next-auth/react";
import { DatabaseUser } from "@/lib/types";
import LoadingButton from "./LoadingButton";
import { Skeleton } from "./ui/skeleton";
import toast from "react-hot-toast";

const AccountActions = ({ user }: { user: DatabaseUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mailSubscribeLoading, setMailSubscribeLoading] = useState(false);
  const [subscribed, setSubscribed] = useState<boolean | null>(null); // Use null as initial value

  useEffect(() => {
    const fetchIsSubscribed = async () => {
      const isSubscribed = await checkMailSubscribed(user.email);
      setSubscribed(!!isSubscribed);
    };

    fetchIsSubscribed();
  }, [user.email]); // Add user.email as dependency

  const handleDelete = async () => {
    setLoading(true);
    const toastId = toast.loading("Deleting account...");
    const deleteResponse = await deleteUser(user._id, user.email);
    if (!deleteResponse) {
      toast.error("Failed to delete", { id: toastId });
    } else {
      setIsOpen(false);
      await signOut();
      toast.success("Deleted successfully", { duration: 4000, id: toastId });
    }
    setLoading(false);
  };

  const handleMailSubscribe = async () => {
    setMailSubscribeLoading(true);
    if (subscribed) {
      const toastId = toast.loading("Removing email from mailing list...");
      const removeResponse = await removeMailSubscriber(user.email);
      if (
        typeof removeResponse === "string" &&
        removeResponse.includes("ERROR")
      ) {
        toast.error("Can't update now. Try again in a couple minutes", {
          id: toastId,
        });
      } else {
        setSubscribed(false);
        toast.success("Successfully unsubscribed", { id: toastId });
      }
    } else {
      const toastId = toast.loading("Adding email to mailing list...");
      const addResponse = await addMailSubscriber(user.email);
      if (typeof addResponse === "string" && addResponse.includes("ERROR")) {
        toast.error("Can't update now. Try again in a couple minutes", {
          id: toastId,
        });
      } else {
        setSubscribed(true);
        toast.success("Successfully subscribed", { id: toastId });
      }
    }
    setMailSubscribeLoading(false);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Account Actions</h2>
      <div className="flex flex-col gap-1">
        <p>Manage Mailing List Subscription</p>
        {subscribed === null ? (
          <Skeleton className="h-10 w-32" />
        ) : (
          <LoadingButton
            loading={mailSubscribeLoading}
            className="w-fit font-semibold"
            onClick={handleMailSubscribe}
          >
            {subscribed === true ? (
              <>
                Unsubscribe
                <FaTimesCircle className="ml-2" />
              </>
            ) : (
              <>
                Subscribe
                <FaEnvelope className="ml-2" />
              </>
            )}
          </LoadingButton>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p>Manage Account Deletion</p>
        <SingleActionDialog
          buttonClassName="w-fit font-semibold"
          dialogTitle="Delete Account"
          dialogDescription="This is a permanent action. This means you will lose ALL information related to your account."
          triggerButtonContent={
            <>
              Delete Account <FaTrash className="ml-2" />
            </>
          }
          buttonContent="Delete Account"
          buttonAction={handleDelete}
          open={isOpen}
          onOpenChange={setIsOpen}
          loading={loading}
          buttonVariant="destructive"
        />
      </div>
    </section>
  );
};

export default AccountActions;
