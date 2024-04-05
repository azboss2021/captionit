"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { BACK_BUTTON_GOTO } from "@/lib/constants";
import { useRouter } from "next/navigation";

const LeaveButton = ({ dashboard = false }: { dashboard?: boolean }) => {
  const router = useRouter();

  return dashboard ? (
    <Button asChild variant="ghost">
      <Link href={BACK_BUTTON_GOTO} className="flex w-fit items-center gap-2">
        <FaArrowLeft /> Back
      </Link>
    </Button>
  ) : (
    <Button
      variant="ghost"
      onClick={router.back}
      className="flex w-fit items-center gap-2"
    >
      <FaArrowLeft /> Back
    </Button>
  );
};
export default LeaveButton;
