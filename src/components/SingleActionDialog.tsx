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

const SingleActionDialog = ({
  buttonClassName,
  dialogTitle,
  dialogDescription,
  triggerButtonContent,
  buttonContent,
  buttonAction,
  open,
  onOpenChange,
  loading,
  buttonVariant,
}: {
  buttonClassName?: string;
  dialogTitle: string;
  dialogDescription: ReactNode | string;
  triggerButtonContent: ReactNode | string;
  buttonContent: ReactNode | string;
  buttonAction: () => void;
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
  loading: boolean;
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
          <LoadingButton
            loading={loading}
            onClick={buttonAction}
            variant={buttonVariant}
            className="rounded-full font-semibold"
          >
            {buttonContent}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SingleActionDialog;
