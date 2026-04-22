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

export default function SpotlightClient({ items }: SpotlightProps) {
  return <Spotlight items={items} />;
}
