"use client"

import { AspectRatio as AspectRatioPrimitive } from "radix-ui"

/**
 * Wrapper around Radix UI's AspectRatio primitive that forwards all props and sets `data-slot="aspect-ratio"`.
 *
 * @param props - Props forwarded to `AspectRatioPrimitive.Root`
 * @returns A React element rendering `AspectRatioPrimitive.Root` with the provided props and `data-slot="aspect-ratio"`
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
