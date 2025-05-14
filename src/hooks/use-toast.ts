
import { toast as sonnerToast, type Toast } from "sonner";

export type ToastProps = Toast & {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
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

  return sonnerToast(title, {
    description,
    ...variantStyle,
    ...rest,
  });
}

export { useToast } from "sonner";
