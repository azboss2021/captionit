import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import LoadingButton from "./LoadingButton";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const SingleLinkDialog = ({
  buttonClassName,
  dialogTitle,
  dialogDescription,
  triggerButtonContent,
  buttonContent,
  open,
  onOpenChange,
  buttonVariant,
  link,
}: {
  buttonClassName?: string;
  dialogTitle: string;
  dialogDescription: ReactNode | string;
  triggerButtonContent: ReactNode | string;
  buttonContent: ReactNode | string;
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  link: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={buttonClassName} variant={buttonVariant}>
          {triggerButtonContent}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild variant={buttonVariant} className="font-semibold">
            <Link href={link}>
              {buttonContent} <FaArrowRight className="ml-2" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SingleLinkDialog;
