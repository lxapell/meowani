"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ComboboxItem } from "@/components/ui/combobox";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { cn } from "@/lib/shadcn/utils";

export type Virtualizer = ReturnType<
  typeof useVirtualizer<HTMLDivElement, Element>
>;

interface VirtualizedComboboxListProps {
  items: Item[];
  itemHeight?: number;
  overscan?: number;
  paddingStart?: number;
  paddingEnd?: number;
  scrollPaddingEnd?: number;
  scrollPaddingStart?: number;
  className?: string;
  virtualizerRef: React.RefObject<Virtualizer | null>;
}

interface Item {
  id: number;
  label: string;
  value: string;
}

export function VirtualizedComboboxList({
  itemHeight = 32,
  overscan = 20,
  className,
  virtualizerRef,
}: Omit<VirtualizedComboboxListProps, "items">) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const items = ComboboxPrimitive.useFilteredItems<Item>();

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan,
  });

  React.useImperativeHandle(virtualizerRef, () => virtualizer);

  const handleScrollElementRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      parentRef.current = element;
      if (element) {
        virtualizer.measure();
      }
    },
    [virtualizer],
  );

  const totalSize = virtualizer.getTotalSize();

  if (!items.length) {
    return null;
  }

  return (
    <div
      ref={handleScrollElementRef}
      className={cn(
        "max-h-[300px] overflow-y-auto",
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overscroll-contain",
        "max-h-[250px]",
        className,
      )}
    >
      <div
        className="w-full relative"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          if (!item) {
            return null;
          }
          return (
            <ComboboxItem
              key={virtualRow.key}
              index={virtualRow.index}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              value={item}
              className="absolute top-0 left-0 w-full"
              style={{
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="truncate line-clamp-1">{item.label}</div>
            </ComboboxItem>
          );
        })}
      </div>
    </div>
  );
}
