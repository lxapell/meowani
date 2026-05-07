import { cn } from "@/lib/shadcn/utils";
import { Loader2Icon } from "lucide-react";

/**
 * Renders a spinning loader SVG icon for use as a loading indicator.
 *
 * @param className - Additional CSS class names to merge with the default sizing and spin classes
 * @param props - Additional SVG props to forward to the icon element
 * @returns The rendered loader SVG element with `role="status"` and `aria-label="Loading"`
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
