"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "@/lib/shadcn/utils";
import { getImageProps } from "next/image";

/**
 * Renders a styled Avatar wrapper around Radix's AvatarPrimitive.Root, applying size metadata and merged utility classes.
 *
 * @param className - Optional additional CSS classes to merge with the component's default styling.
 * @param size - Visual size variant for the avatar; one of `"default"`, `"sm"`, or `"lg"`. Affects rendered sizing classes and the `data-size` attribute.
 * @returns A React element that wraps `AvatarPrimitive.Root` with standardized styling, `data-slot="avatar"`, `data-size`, and any forwarded props.
 */
function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders an avatar image, using Next.js image optimization when a `src` is provided.
 *
 * When `src` is falsy, forwards the original props to `AvatarPrimitive.Image`. When `src` is truthy,
 * computes sizing (uses numeric `width` and `height` if both are present; otherwise uses `{ fill: true, sizes: "32px" }`),
 * obtains optimized props via `getImageProps`, and renders `AvatarPrimitive.Image` with those optimized props.
 *
 * @param className - Additional CSS classes applied to the image container.
 * @param props - All other `AvatarPrimitive.Image` props. If `src` is provided, it will be passed to the image optimizer along with `alt`, `width`, and `height` (when available).
 * @returns An `AvatarPrimitive.Image` element; optimized Next.js image props are applied when `src` is present, otherwise the original props are forwarded.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  const { src, alt, width, height, ...rest } = props;

  if (!src) {
    return (
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        className={cn(
          "aspect-square size-full rounded-full object-cover",
          className,
        )}
        {...props}
      />
    );
  }

  const size =
    width && height
      ? { width: Number(width), height: Number(height) }
      : { fill: true, sizes: "32px" };

  const { props: nextOptimizedProps } = getImageProps({
    src: src as string,
    alt: String(alt),
    ...size,
    ...rest,
  });

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className,
      )}
      {...nextOptimizedProps}
    />
  );
}

/**
 * Renders a styled fallback element for an Avatar when the image is unavailable.
 *
 * Applies standardized sizing and muted fallback styling and forwards any received props to the underlying primitive.
 *
 * @returns A React element representing the avatar fallback
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a circular badge positioned at the avatar's bottom-right corner.
 *
 * The element uses size-aware utility classes (adjusting dimensions and hiding nested SVGs at the small size)
 * and merges any `className` passed in with its internal styling.
 *
 * @param className - Additional CSS classes to merge onto the badge container
 * @param props - All other standard `span` props forwarded to the badge element
 * @returns The rendered `<span>` used as an avatar badge overlay
 */
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute end-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Groups avatar elements into an overlapping layout with consistent ring styling.
 *
 * Renders a container div with `data-slot="avatar-group"` that applies horizontal overlap, applies ring styling to contained avatar slots, and merges any additional `className` or other div props.
 *
 * @param className - Additional CSS classes to merge into the container
 * @returns The container div element used to group avatars
 */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a count indicator for an AvatarGroup with size-dependent sizing, nested SVG sizing rules, and ring styling.
 *
 * @param className - Additional CSS classes to merge with the component's default styles.
 * @returns A div element used as the avatar group count indicator.
 */
function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};
