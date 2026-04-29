"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { cn } from "@/lib/shadcn/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

/**
 * Accesses the Carousel context from the nearest Carousel provider.
 *
 * @returns The context value containing carousel refs, the Embla API, navigation handlers, scroll state, and configuration.
 * @throws Error with message "useCarousel must be used within a <Carousel />" if no Carousel provider is in the component tree.
 */
function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

/**
 * Provides a carousel provider that initializes and exposes Embla-based carousel controls and state to its children.
 *
 * The component sets up Embla with the given options and plugins, tracks whether previous/next scrolling is available, wires left/right arrow keys to navigation, and supplies refs, API, navigation handlers, and state via context to descendant components.
 *
 * @param orientation - Layout orientation; `"horizontal"` uses the x axis, `"vertical"` uses the y axis.
 * @param opts - Embla carousel options passed through to the underlying Embla instance.
 * @param plugins - Embla plugins to attach to the underlying carousel.
 * @param setApi - Optional callback invoked with the Embla API instance when it becomes available.
 * @param className - CSS class names applied to the wrapper element.
 * @param children - Child nodes rendered inside the carousel region.
 * @returns The rendered carousel region wrapped by a provider that exposes carousel context to children.
 */
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

/**
 * Render the Embla viewport container and its inner flex track for carousel items.
 *
 * The outer element attaches the carousel ref and hides overflow; the inner track
 * lays out children in a horizontal row or vertical column based on the carousel orientation
 * and merges any provided `className` and other div props.
 *
 * @returns The carousel content container element
 */
function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a single carousel slide container with orientation-aware spacing and accessibility attributes.
 *
 * The element receives `role="group"` and `aria-roledescription="slide"`, a baseline set of layout classes
 * ("min-w-0 shrink-0 grow-0 basis-full"), and orientation-dependent spacing: horizontal slides get left padding,
 * vertical slides get top padding. Any `className` passed in is merged with the internal classes and all other props
 * are forwarded to the underlying `div`.
 *
 * @param className - Additional class names to merge with the component's internal classes
 * @returns The rendered slide `<div>` for use inside the Carousel
 */
function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "ps-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a previous-slide control for the surrounding Carousel.
 *
 * Renders a positioned circular Button that calls the carousel's `scrollPrev` handler and is disabled when the carousel cannot scroll to a previous slide.
 *
 * @param className - Additional class names applied to the Button.
 * @param variant - Button visual variant (defaults to `"outline"`).
 * @param size - Button size (defaults to `"icon-sm"`).
 * @param props - All other props are forwarded to the underlying Button.
 * @returns A Button element that triggers navigation to the previous slide; disabled when no previous slide is available.
 */
function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -start-12 -translate-y-1/2"
          : "-top-12 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon className="rtl:rotate-180" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

/**
 * Renders a next-slide control button for the carousel, positioned according to the carousel's orientation and disabled when advancing is not possible.
 *
 * @returns A Button element that advances the carousel to the next slide when clicked; `false` when advancement is unavailable, causing the button to be `disabled`.
 */
function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -end-12 -translate-y-1/2"
          : "-bottom-12 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon className="rtl:rotate-180" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
}
