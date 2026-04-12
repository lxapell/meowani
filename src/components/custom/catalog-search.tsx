"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxGroup,
  useComboboxAnchor,
  ComboboxValue,
  ComboboxTrigger,
  ComboboxLabel,
} from "@/components/ui/combobox";
import {
  ArrowUpDownIcon,
  ChevronsUpDownIcon,
  SearchIcon,
  SlidersVerticalIcon,
  Trash2Icon,
} from "lucide-react";

import {
  genreEnums,
  tagEnums,
  formatEnums,
  seasonEnums,
  statusEnums,
  sortEnums,
  studioEnums,
  yearEnums,
} from "@/constants/anilist/enums";

const tags = tagEnums.filter((tag) => !tag.isAdult);

export function CatalogSearch() {
  const anchor = useComboboxAnchor();
  return (
    <Collapsible className="w-full flex flex-col gap-2">
      <ButtonGroup className="flex w-full">
        <ButtonGroup className="flex flex-1">
          <InputGroup className="md:h-10 relative flex w-full">
            <InputGroupInput placeholder="Search for anime, movies..." />
            <InputGroupAddon align="inline-end">
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </ButtonGroup>
        <ButtonGroup>
          <CollapsibleTrigger asChild>
            <Button className="md:size-10">
              <SlidersVerticalIcon />
            </Button>
          </CollapsibleTrigger>
        </ButtonGroup>
        <ButtonGroup>
          <Button className="md:size-10">
            <Trash2Icon />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
      <CollapsibleContent>
        <ComboboxGroup className="grid grid-cols-2 md:grid-cols-7 gap-2">
          <Combobox autoHighlight items={genreEnums} defaultValue={null}>
            <div className="flex flex-col relative">
              <ComboboxLabel className="px-0">Genres</ComboboxLabel>
              <ComboboxTrigger
                aria-placeholder="Genres"
                render={
                  <Button
                    variant="outline"
                    className="justify-between font-normal"
                  >
                    <div className="w-full text-start truncate">
                      <ComboboxValue placeholder="Any" />
                    </div>
                    <ChevronsUpDownIcon />
                  </Button>
                }
              />
            </div>
            <ComboboxContent className="">
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Combobox autoHighlight items={tags} defaultValue={null}>
            <div className="flex flex-col relative">
              <ComboboxLabel className="px-0">Tags</ComboboxLabel>
              <ComboboxTrigger
                aria-placeholder="Tags"
                render={
                  <Button
                    variant="outline"
                    className="justify-between font-normal"
                  >
                    <div className="w-full text-start truncate">
                      <ComboboxValue placeholder="Any" />
                    </div>
                    <ChevronsUpDownIcon />
                  </Button>
                }
              />
            </div>
            <ComboboxContent className="">
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.name} value={item.name}>
                    {item.name}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Combobox
            multiple
            autoHighlight
            items={formatEnums}
            defaultValue={[]}
          >
            <div className="flex flex-col relative">
              <ComboboxLabel className="px-0">Formats</ComboboxLabel>
              <ComboboxTrigger
                aria-placeholder="Formats"
                render={
                  <Button
                    variant="outline"
                    className="justify-between font-normal"
                  >
                    <div className="w-full text-start truncate">
                      <ComboboxValue placeholder="Any" />
                    </div>
                    <ChevronsUpDownIcon />
                  </Button>
                }
              />
            </div>
            <ComboboxContent>
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.normal} value={item.query}>
                    {item.normal}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Combobox autoHighlight items={yearEnums} defaultValue={null}>
            <div className="flex flex-col relative">
              <ComboboxLabel className="px-0">Year</ComboboxLabel>
              <ComboboxTrigger
                aria-placeholder="Year"
                render={
                  <Button
                    variant="outline"
                    className="justify-between font-normal"
                  >
                    <div className="w-full text-start truncate">
                      <ComboboxValue placeholder="Any" />
                    </div>
                    <ChevronsUpDownIcon />
                  </Button>
                }
              />
            </div>
            <ComboboxContent>
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Combobox autoHighlight items={seasonEnums} defaultValue={null}>
            <div className="flex flex-col relative">
              <ComboboxLabel className="px-0">Season</ComboboxLabel>
              <ComboboxTrigger
                aria-placeholder="Season"
                render={
                  <Button
                    variant="outline"
                    className="justify-between font-normal"
                  >
                    <div className="w-full text-start truncate">
                      <ComboboxValue placeholder="Any" />
                    </div>
                    <ChevronsUpDownIcon />
                  </Button>
                }
              />
            </div>
            <ComboboxContent className="">
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.normal} value={item.query}>
                    {item.normal}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Combobox autoHighlight items={statusEnums} defaultValue={null}>
            <div className="flex flex-col relative">
              <ComboboxLabel className="px-0">Status</ComboboxLabel>
              <ComboboxTrigger
                aria-placeholder="Status"
                render={
                  <Button
                    variant="outline"
                    className="justify-between font-normal"
                  >
                    <div className="w-full text-start truncate">
                      <ComboboxValue placeholder="Any" />
                    </div>
                    <ChevronsUpDownIcon />
                  </Button>
                }
              />
            </div>
            <ComboboxContent className="">
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.normal} value={item.query}>
                    {item.normal}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Combobox autoHighlight items={sortEnums} defaultValue={null}>
            <div className="flex flex-col relative">
              <ComboboxLabel className="px-0">Sort by</ComboboxLabel>
              <ComboboxTrigger
                aria-placeholder="Sort by"
                render={
                  <Button
                    variant="outline"
                    className="justify-between font-normal"
                  >
                    <div className="w-full text-start truncate">
                      <ComboboxValue placeholder="Any" />
                    </div>
                    <ChevronsUpDownIcon />
                  </Button>
                }
              />
            </div>
            <ComboboxContent className="">
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.normal} value={item.query}>
                    {item.normal}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Combobox autoHighlight items={studioEnums} defaultValue={null}>
            <div className="flex flex-col relative">
              <ComboboxLabel className="px-0">Studio</ComboboxLabel>
              <ComboboxTrigger
                aria-placeholder="Studio"
                render={
                  <Button
                    variant="outline"
                    className="justify-between font-normal"
                  >
                    <div className="w-full text-start truncate">
                      <ComboboxValue placeholder="Any" />
                    </div>
                    <ChevronsUpDownIcon />
                  </Button>
                }
              />
            </div>
            <ComboboxContent className="">
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.id} value={item.name}>
                    {item.name}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ComboboxGroup>
      </CollapsibleContent>
    </Collapsible>
  );
}
