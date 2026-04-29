"use client";

import type { ISimpleAnimeData } from "@/utils/mapper";
import * as React from "react";
import dynamic from "next/dynamic";

import { SpotlightSkeleton } from "@/components/custom/spotlight";

const Spotlight = dynamic(
  () => import("@/components/custom/spotlight").then((mod) => mod.Spotlight),
  {
    ssr: false,
    loading: () => <SpotlightSkeleton />,
  },
);

interface SpotlightProps {
  items: ISimpleAnimeData[];
}

/**
 * Client-side wrapper that renders the Spotlight component with the provided items.
 *
 * @param items - Array of anime items to display in the Spotlight
 * @returns The Spotlight React element configured with `items`
 */
export default function SpotlightClient({ items }: SpotlightProps) {
  return <Spotlight items={items} />;
}
