import { useId, type ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Types

interface AppTextFieldProps extends ComponentProps<typeof Input> {
  label: string;
}

// Component

function AppTextField({ label, id, className, ...props }: AppTextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="space-y-2">
      <Label
        htmlFor={inputId}
        className="text-[13px] font-medium text-theme-300"
      >
        {label}
      </Label>
      <Input
        id={inputId}
        className={cn(
          "h-12 rounded-xl border-theme-50/10 bg-theme-50/4 px-4 text-theme-50 placeholder:text-theme-500 focus-visible:border-theme-300 focus-visible:ring-theme-300/30",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { AppTextField };
export type { AppTextFieldProps };
