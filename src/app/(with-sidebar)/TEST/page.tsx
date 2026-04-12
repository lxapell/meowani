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
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
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
import { Label } from "@/components/ui/label";

const tags = tagEnums.filter((tag) => !tag.isAdult);
interface Value {
  normal: string;
  query: string;
  id: number;
  name: string;
}

export default function CatalogSearch() {
  const anchor = useComboboxAnchor();
  return (
    <>
      <Collapsible className="w-full flex flex-col gap-2">
        <ButtonGroup className="flex w-full flex-col">
          <Label className="py-1.5 px-0 text-xs font-bold text-muted-foreground">
            Search
          </Label>
          <div className="flex w-full gap-2">
            <ButtonGroup className="flex flex-1">
              <InputGroup className="md:h-10 relative flex w-full">
                <InputGroupInput placeholder="Search for anime, movies..." />
                <InputGroupAddon align="inline-end">
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </ButtonGroup>
            <div className="gap-2 w-fit items-stretch flex">
              <CollapsibleTrigger asChild>
                <Button className="md:size-10">
                  <SlidersVerticalIcon />
                </Button>
              </CollapsibleTrigger>
              <Button className="md:size-10">
                <Trash2Icon />
              </Button>
            </div>
          </div>
        </ButtonGroup>
        <CollapsibleContent>
          <ComboboxGroup className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <Combobox
              multiple
              autoHighlight
              items={genreEnums}
              defaultValue={[]}
            >
              <div className="flex flex-col relative">
                <ComboboxLabel className="px-0 font-bold">Genres</ComboboxLabel>
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
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Search"
                  showClear
                />
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
            <Combobox
              itemToStringValue={(itemValue: Value) => itemValue.name}
              itemToStringLabel={(itemValue: Value) => itemValue.name}
              multiple
              autoHighlight
              items={tags}
              defaultValue={[]}
            >
              <div className="flex flex-col relative">
                <ComboboxLabel className="px-0 font-bold">Tags</ComboboxLabel>
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
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Search"
                  showClear
                />
                <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.name} value={item}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Combobox
              multiple
              itemToStringValue={(itemValue: Value) => itemValue.query}
              itemToStringLabel={(itemValue: Value) => itemValue.normal}
              autoHighlight
              items={formatEnums}
              defaultValue={[]}
            >
              <div className="flex flex-col relative">
                <ComboboxLabel className="px-0 font-bold">
                  Formats
                </ComboboxLabel>
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
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Search"
                  showClear
                />
                <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.query} value={item}>
                      {item.normal}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Combobox autoHighlight items={yearEnums} defaultValue={null}>
              <div className="flex flex-col relative">
                <ComboboxLabel className="px-0 font-bold">Year</ComboboxLabel>
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
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Search"
                  showClear
                />
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
            <Combobox
              itemToStringValue={(itemValue: Value) => itemValue.query}
              itemToStringLabel={(itemValue: Value) => itemValue.normal}
              autoHighlight
              items={seasonEnums}
              defaultValue={null}
            >
              <div className="flex flex-col relative">
                <ComboboxLabel className="px-0 font-bold">Season</ComboboxLabel>
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
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Search"
                  showClear
                />
                <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.normal} value={item}>
                      {item.normal}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Combobox
              itemToStringValue={(itemValue: Value) => itemValue.query}
              itemToStringLabel={(itemValue: Value) => itemValue.normal}
              autoHighlight
              items={statusEnums}
              defaultValue={null}
            >
              <div className="flex flex-col relative">
                <ComboboxLabel className="px-0 font-bold">Status</ComboboxLabel>
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
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Search"
                  showClear
                />
                <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      key={item.normal}
                      itemID={item.query}
                      value={item}
                    >
                      {item.normal}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Combobox
              itemToStringValue={(itemValue: Value) => itemValue.query}
              itemToStringLabel={(itemValue: Value) => itemValue.normal}
              autoHighlight
              items={sortEnums}
              defaultValue={null}
            >
              <div className="flex flex-col relative">
                <ComboboxLabel className="px-0 font-bold">
                  Sort by
                </ComboboxLabel>
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
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Search"
                  showClear
                />
                <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.normal} value={item}>
                      {item.normal}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Combobox
              itemToStringValue={(itemValue: Value) => itemValue.name}
              itemToStringLabel={(itemValue: Value) => itemValue.name}
              autoHighlight
              items={studioEnums}
              defaultValue={null}
            >
              <div className="flex flex-col relative">
                <ComboboxLabel className="px-0 font-bold">Studio</ComboboxLabel>
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
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Search"
                  showClear
                />
                <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.id} value={item}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldGroup className="grid grid-cols-2 col-span-2 gap-2">
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="min-duration"
                  className="py-1.5 text-xs text-muted-foreground px-0 font-bold"
                >
                  Min duration
                </FieldLabel>
                <Input id="min-duration" type="number" placeholder="0" />
              </Field>
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="max-duration"
                  className="py-1.5 text-xs text-muted-foreground px-0 font-bold"
                >
                  Max duration
                </FieldLabel>
                <Input id="max-duration" type="number" placeholder="Any" />
              </Field>
            </FieldGroup>
            <FieldGroup className="grid grid-cols-2 col-span-2 gap-2">
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="min-episodes"
                  className="py-1.5 text-xs text-muted-foreground px-0 font-bold"
                >
                  Min episodes
                </FieldLabel>
                <Input id="min-episodes" type="number" placeholder="1" />
              </Field>
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="max-episodes"
                  className="py-1.5 text-xs text-muted-foreground px-0 font-bold"
                >
                  Max expisodes
                </FieldLabel>
                <Input id="max-episodes" type="number" placeholder="Any" />
              </Field>
            </FieldGroup>
          </ComboboxGroup>
        </CollapsibleContent>
      </Collapsible>
      <div>hola</div>
    </>
  );
}
