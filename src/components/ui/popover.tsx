"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/shadcn/utils"

/**
 * Renders a Radix Popover root element with a `data-slot="popover"` attribute and forwards all props to it.
 *
 * @param props - Props forwarded to Radix PopoverPrimitive.Root
 * @returns The Popover root element.
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/**
 * Renders a popover trigger element and forwards all received props.
 *
 * The element is annotated with `data-slot="popover-trigger"` to allow targeted styling or testing.
 *
 * @returns The rendered popover trigger element with the provided props applied.
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * Renders styled popover content inside a Portal with configurable alignment and side offset.
 *
 * The component provides a set of default visual styles and animations and merges any
 * supplied `className` with those defaults.
 *
 * @param className - Additional CSS class names to apply to the content container.
 * @param align - Alignment of the content relative to the trigger; defaults to `"center"`.
 * @param sideOffset - Distance in pixels between the content and the trigger; defaults to `4`.
 * @returns The rendered Popover content element.
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-4 rounded-md bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/**
 * Renders a Radix Popover anchor element annotated with `data-slot="popover-anchor"` and forwards all props.
 *
 * @returns The rendered Popover anchor element with the provided props applied.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

/**
 * Renders a styled container for popover header content.
 *
 * Merges the caller `className` with base header classes and sets `data-slot="popover-header"`.
 *
 * @returns A `div` element with header styling (`flex`, column layout, gap, small text) and the `data-slot="popover-header"` attribute.
 */
function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled heading element annotated as the popover title.
 *
 * @param className - Additional CSS classes appended to the base title styles
 * @returns The rendered heading element with `data-slot="popover-title"`
 */
function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-heading font-medium", className)}
      {...props}
    />
  )
}

/**
 * Renders a paragraph element styled for use as popover descriptive text.
 *
 * The element is annotated with `data-slot="popover-description"` and merges
 * caller `className` with the component's base description styling.
 *
 * @returns A `p` element with popover description styling and any forwarded props
 */
function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
