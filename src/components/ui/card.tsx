import * as React from "react"

import { cn } from "@/lib/shadcn/utils"

/**
 * Renders a styled card container element.
 *
 * The component outputs a `div` that serves as the card root, includes `data-slot="card"` and `data-size={size}`, and merges any provided `className` and other `div` props onto that element.
 *
 * @param size - Visual size variant of the card; `"default"` (default) or `"sm"`, which adjusts spacing and typography.
 * @returns A `div` element used as the card root with `data-slot="card"` and `data-size` set to `size`.
 */
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-6 overflow-hidden rounded-xl bg-card py-6 text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card header container used to lay out title, description, and actions.
 *
 * The element includes a `data-slot="card-header"` attribute and merges the provided `className` with the component's layout classes.
 *
 * @returns The header `div` element for use inside a `Card`.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card title slot with heading typography and size-aware styles.
 *
 * @returns The `div` element for the card title (`data-slot="card-title"`).
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-normal font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders card description content styled as small, muted text.
 *
 * @param className - Additional CSS classes to merge with the component's default styling
 * @returns A `div` element with card-description data attribute and combined classes for small, muted text
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's action slot container used to position action controls.
 *
 * @param className - Additional CSS class names to merge with the component's layout classes
 * @returns The rendered card action container element with `data-slot="card-action"`
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the Card's content area with horizontal padding that adapts to the Card's size.
 *
 * @returns A `div` element with `data-slot="card-content"` and merged `className`; applies `px-6` by default and `px-4` when the Card has `data-size="sm"`.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 group-data-[size=sm]/card:px-4", className)}
      {...props}
    />
  )
}

/**
 * Renders the footer container for a Card with built-in layout, rounded bottom corners, and responsive padding.
 *
 * @param className - Additional CSS classes to merge with the component's default footer styles
 * @returns A `div` element serving as the card footer
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
