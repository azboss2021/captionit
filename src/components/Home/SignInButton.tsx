"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import LoadingButton from "../LoadingButton";
import { LOGIN_CALLBACK } from "@/lib/constants";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const SignInButton = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingButton
      loading={loading}
      className={cn("group flex w-fit gap-2 px-6 text-base", className)}
      onClick={async () => {
        if (loading) return;
        setLoading(true);

        try {
          await signIn("google", { callbackUrl: LOGIN_CALLBACK });
        } catch (error) {
          console.error(error);
          toast.error(
            "Something went wrong while logging in. Please try again",
          );
        }
      }}
    >
      Sign In
    </LoadingButton>
  );
};
export default SignInButton;
