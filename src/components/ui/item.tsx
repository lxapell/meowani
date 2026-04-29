import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/shadcn/utils"
import { Separator } from "@/components/ui/separator"

/**
 * Container that groups related items into a vertical list.
 *
 * Renders a wrapper `div` with `role="list"` and `data-slot="item-group"`, applies vertical spacing and layout classes, and forwards any additional `div` props to the element.
 *
 * @returns The rendered container element for grouping items.
 */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * Render a horizontal separator configured for use inside an item group.
 *
 * Adds `data-slot="item-separator"`, forces `orientation="horizontal"`, and applies vertical spacing.
 *
 * @param className - Additional CSS classes to merge with the default vertical margin
 * @returns A Separator element configured for grouped items
 */
function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-2", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center rounded-md border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted/50",
      },
      size: {
        default: "gap-3.5 px-4 py-3.5",
        sm: "gap-2.5 px-3 py-2.5",
        xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Render an item container that applies CVA-driven styling and exposes `data-variant` and `data-size` attributes.
 *
 * @param variant - Visual variant to apply (`default`, `outline`, `muted`) which alters border/background styling.
 * @param size - Size variant to apply (`default`, `sm`, `xs`) which adjusts spacing and padding.
 * @param asChild - If `true`, render `Slot.Root` so the caller can provide the DOM element; otherwise render a `div`.
 * @returns A React element representing the styled item container.
 */
function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Renders a media container for an item (for icons, avatars, or images).
 *
 * @param variant - Visual variant that adjusts sizing and background behavior. Supported values:
 *   - `"default"`: transparent container with default sizing.
 *   - `"icon"`: ensures contained SVGs receive icon sizing.
 *   - `"image"`: fixed container sizing and image cover behavior.
 * @param className - Additional class names merged with the variant classes.
 * @returns A `div` element with `data-slot="item-media"`, `data-variant` set to `variant`, and classes from `itemMediaVariants`.
 */
function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the content region of an item with layout and responsive spacing.
 *
 * The container uses a vertical flex layout and applies gap spacing that collapses for `group-data-[size=xs]/item`. When placed immediately after another `[data-slot=item-content]`, it does not flex-grow.
 *
 * @returns The item content container element.
 */
function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a title container for an item with single-line truncation and title typography.
 *
 * @param className - Additional class names merged with the component's base styles.
 * @returns A div element with `data-slot="item-title"` used for item titles.
 */
function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the item description paragraph used inside an Item layout.
 *
 * @returns A `<p>` element with `data-slot="item-description"` and styling that clamps text to two lines, applies muted text styles and size adjustments for compact groups, and ensures contained links are underlined with proper hover color.
 */
function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-start text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a container for item action controls.
 *
 * The element produced has `data-slot="item-actions"`, applies a horizontal flex layout with centered alignment and spacing between children, merges the provided `className`, and forwards all other props to the underlying element.
 *
 * @returns The rendered container element for action controls.
 */
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/**
 * Renders the header region for an item, arranging children horizontally with space between.
 *
 * @returns The header container element for an item (`div` with `data-slot="item-header"`).
 */
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the footer area for an item with a horizontal layout and space-between alignment.
 *
 * @returns The footer container element with `data-slot="item-footer"` and the component's layout classes applied.
 */
function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
