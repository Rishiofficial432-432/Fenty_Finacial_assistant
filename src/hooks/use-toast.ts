
import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  id?: string;
};

const variantStyles = {
  default: {
    className: "group border-border bg-background text-foreground",
  },
  destructive: {
    className:
      "group border-destructive bg-destructive text-destructive-foreground",
  },
  success: {
    className: "group border-green-500 bg-green-500/90 text-white",
  },
  warning: {
    className: "group border-yellow-500 bg-yellow-500/90 text-white",
  },
  info: {
    className: "group border-purple-500 bg-purple-500/90 text-white",
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

// Creating a hook-like interface for compatibility with the existing code
export const useToast = () => {
  return {
    toast,
    toasts: [],
  };
};
