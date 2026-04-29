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

/**
 * Accesses the current search context for search UI state and controls.
 *
 * @returns The current `SearchContextProps` object.
 * @throws Error if called outside of a `SearchProvider`.
 */
function useSearch() {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider.");
  }

  return context;
}

/**
 * Provides search UI state and handlers to descendant components and persists the open/closed state.
 *
 * The provider supports controlled and uncontrolled usage for `open`, `query`, and popover visibility.
 * When the open state changes it calls `onOpenChange` if provided (controlled mode) or updates internal state
 * (uncontrolled mode), and writes the resulting boolean to the `search_state` cookie with a one-week max-age.
 *
 * @param open - Optional controlled open state; when omitted the provider manages open state internally.
 * @param onOpenChange - Optional callback invoked with the new open state when it changes.
 * @param query - Optional controlled query string; when omitted the provider may manage query internally.
 * @param onQueryChange - Optional callback invoked with the new query when it changes.
 * @param openPopover - Optional controlled popover open state.
 * @param onOpenPopoverChange - Optional callback invoked when the popover open state changes.
 * @param children - React children rendered within the provider.
 */
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

  const [_query, _setQuery] = React.useState("");
  const query = queryProp ?? _query;
  const setQuery = React.useCallback(
    (value: string) => {
      if (setQueryProp) {
        setQueryProp(value);
      } else {
        _setQuery(value);
      }
    },
    [setQueryProp],
  );

  const [_openPopover, _setOpenPopover] = React.useState(false);
  const openPopover = openPopoverProp ?? _openPopover;
  const togglePopover = React.useCallback(
    (value: boolean) => {
      if (setOpenPopoverProp) {
        setOpenPopoverProp(value);
      } else {
        _setOpenPopover(value);
      }
    },
    [setOpenPopoverProp],
  );

  return (
    <SearchContext.Provider
      value={{
        state: isOpen ? "expanded" : "collapsed",
        open: isOpen,
        setOpen,
        query,
        setQuery,
        openPopover,
        togglePopover,
      }}
    >
      <div className={className} style={style} {...props}>
        {children}
      </div>
    </SearchContext.Provider>
  );
}
