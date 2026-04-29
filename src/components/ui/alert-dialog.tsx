"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@/lib/shadcn/utils"
import { Button } from "@/components/ui/button"

/**
 * Wraps Radix's AlertDialog.Root, applying a standardized `data-slot` attribute and forwarding all props.
 *
 * @returns A React element for the alert dialog root with `data-slot="alert-dialog"` and all provided props forwarded to the underlying Radix primitive.
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

/**
 * Renders the trigger element for an AlertDialog.
 *
 * The rendered element includes a data-slot attribute of "alert-dialog-trigger" and forwards all received props to the underlying trigger.
 *
 * @returns The trigger element for the alert dialog with passed props applied.
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

/**
 * Renders the alert dialog portal element and attaches a `data-slot="alert-dialog-portal"` attribute.
 *
 * @returns The alert dialog portal React element with all provided props applied.
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

/**
 * Renders the alert dialog overlay with the component's default backdrop, blur and open/close animations.
 *
 * @returns A styled overlay element for the alert dialog
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the alert dialog panel inside a portal with an overlay, applying layout, animation, and size-specific classes.
 *
 * @param size - Controls the dialog's max-width and responsive sizing; accepted values are `"default"` and `"sm"`.
 * @returns The alert dialog content React element (wrapped in its portal and overlay).
 */
function AlertDialogContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-1/2 start-1/2 z-50 grid w-full -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-popover p-6 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

/**
 * Renders a styled header container for the alert dialog.
 *
 * Merges provided class names with the component's default grid and responsive layout classes and forwards other div props.
 *
 * @param className - Additional CSS class names to apply to the header container
 * @param props - Remaining div props forwarded to the underlying element
 * @returns The header element used inside the alert dialog
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-start sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the footer container for an alert dialog, providing responsive layout for action buttons.
 *
 * @param className - Additional class names merged with the component's default layout classes.
 * @returns A div element serving as the alert dialog footer.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled media container used inside an AlertDialog.
 *
 * Additional CSS classes and other `div` props are forwarded to the underlying element.
 *
 * @param className - Additional CSS classes to merge with the component's defaults
 * @returns The media container element for inclusion in an alert dialog
 */
function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the alert dialog title with standardized styling and slot metadata.
 *
 * Merges any provided `className` with the component's default typography and responsive layout classes, sets `data-slot="alert-dialog-title"`, and forwards all other props to the Radix `AlertDialogPrimitive.Title`.
 *
 * @returns A configured `AlertDialogPrimitive.Title` element for use inside the alert dialog.
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled description element for an alert dialog.
 *
 * @param className - Additional CSS classes to merge with the component's default styles
 * @returns The AlertDialogPrimitive.Description element with merged classes and a `data-slot="alert-dialog-description"` attribute
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled action control for an AlertDialog by composing Radix's `Action` inside the project's `Button`.
 *
 * @param className - Additional CSS class names applied to the underlying `Action` element
 * @param variant - Button variant to apply; defaults to `"default"`
 * @param size - Button size to apply; defaults to `"default"`
 * @returns The composed React element: a `Button` (asChild) wrapping Radix `AlertDialogPrimitive.Action`
 */
function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

/**
 * Renders a styled AlertDialog cancel control by wrapping Radix's Cancel primitive in the project's Button.
 *
 * @param className - Additional CSS classes applied to the underlying Cancel element
 * @param variant - Button visual variant to apply; defaults to `"outline"`
 * @param size - Button size to apply; defaults to `"default"`
 * @returns A React element: a Button-styled AlertDialog cancel control that forwards remaining props to Radix's Cancel primitive
 */
function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
