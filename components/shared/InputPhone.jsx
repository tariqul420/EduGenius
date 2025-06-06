import PhoneInput from "react-phone-number-input";

import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";

function InputPhone({ className, ...props }) {
  return (
    <PhoneInput
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "[&_*]:!border-input [&_*]:!outline-none",
        "[&_select]:bg-background [&_select]:dark:text-foreground [&_select_option]:dark:bg-background",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { InputPhone };
