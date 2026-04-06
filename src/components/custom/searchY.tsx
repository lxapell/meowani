"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { SearchIcon } from "lucide-react";

const SEARCH_COOKIE_NAME = "search_state";
const SEARCH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type SearchContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  openPopover: boolean;
  togglePopover: (open: boolean) => void;
};

const SearchContext = React.createContext<SearchContextProps | null>(null);

function useSearch() {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider.");
  }

  return context;
}

function SearchProvider({
  open: openProp,
  onOpenChange: setOpenProp,
  query: queryProp,
  onQueryChange: setQueryProp,
  openPopover: openPopoverProp,
  onOpenPopoverChange: setOpenPopoverProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  openPopover?: boolean;
  onOpenPopoverChange?: (open: boolean) => void;
}) {
  const [_open, _setOpen] = React.useState(false);
  const isOpen = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(isOpen) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      document.cookie = `${SEARCH_COOKIE_NAME}=${openState}; path=/; max-age=${SEARCH_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, isOpen],
  );
}
