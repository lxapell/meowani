import * as React from "react";

import { cn } from "@/lib/shadcn/utils";

/**
 * Renders a centered "End" indicator with decorative horizontal dividers on both sides.
 *
 * The root element has `role="status"` and `aria-label="End of content"` for assistive
 * technologies. Additional `div` props (such as `className`) can be passed through.
 *
 * @returns A `div` element containing the centered "End" label flanked by decorative border spans.
 */
export function EndOfContent({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center",
        "min-h-14 py-3",
        "text-sm text-muted-foreground",
        className,
      )}
      role="status"
      aria-label="End of content"
    >
      <span className="border-t border-border w-8 mr-3" aria-hidden="true" />
      <span>End</span>
      <span className="border-t border-border w-8 mr-3" aria-hidden="true" />
    </div>
  );
}
