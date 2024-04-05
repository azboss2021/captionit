import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

type LoadingButtonProps = {
  loading: boolean;
} & ButtonProps;

const LoadingButton = ({ children, loading, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" size={16} />}
      {children}
    </Button>
  );
};
export default LoadingButton;
