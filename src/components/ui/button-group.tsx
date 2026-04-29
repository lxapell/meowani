import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/shadcn/utils";
import { Separator } from "@/components/ui/separator";

const buttonGroupVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child)]:border-s-0 [&>*:not(:last-child)]:rounded-e-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-md!",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md!",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

/**
 * Renders a container for grouping buttons and related controls with orientation-aware styles.
 *
 * Includes role="group" and data attributes (`data-slot="button-group"` and `data-orientation`) used as hooks for styling and tooling.
 *
 * @param orientation - Controls layout and edge rounding; `"horizontal"` or `"vertical"`. Defaults to `"horizontal"`.
 * @returns A <div> element that serves as the button group container.
 */
function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

/**
 * Renders a compact, text-styled container intended for use inside a ButtonGroup.
 *
 * @param asChild - When true, renders a Radix `Slot.Root` so the caller can substitute the host element; otherwise renders a `div`.
 * @param className - Additional CSS classes merged with the component's text styling.
 * @param props - Additional props are forwarded to the rendered element.
 * @returns The rendered React element (either a `div` or `Slot.Root`) with text-specific styling and sizing classes applied.
 */
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn(
        "flex items-center gap-2 rounded-md border bg-muted px-2.5 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Render a styled Separator configured for use inside a ButtonGroup.
 *
 * @param orientation - Controls the separator's orientation; `"vertical"` (default) renders a vertical divider between stacked items, `"horizontal"` renders a horizontal divider between inline items.
 * @returns The rendered Separator element with `data-slot="button-group-separator"`, merged classes, and any forwarded props.
 */
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className,
      )}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
