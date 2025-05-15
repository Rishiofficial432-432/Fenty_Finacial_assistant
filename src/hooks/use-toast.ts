
import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  id?: string;
};

const variantStyles = {
  default: {
    className: "bg-background border-border",
  },
  destructive: {
    className: "destructive text-destructive-foreground",
  },
  success: {
    className: "bg-green-500 text-white border-green-600",
  },
  warning: {
    className: "bg-yellow-500 text-white border-yellow-600",
  },
  info: {
    className: "bg-blue-500 text-white border-blue-600",
  },
};

export function toast(props: ToastProps) {
  const { title, description, variant = "default", ...rest } = props;
  const variantStyle = variantStyles[variant] || variantStyles.default;

  return sonnerToast(title || "", {
    description,
    id: props.id || String(Date.now()),
    ...variantStyle,
    ...rest,
  });
}

export const useToast = () => {
  return {
    toast,
    // Provide an empty array to fix the 'map' error
    toasts: [],
    dismiss: () => {},
  };
};
