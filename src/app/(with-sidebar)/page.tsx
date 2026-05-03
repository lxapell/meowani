import { Footer } from "@/components/custom/footer";
import FooterClient from "@/components/custom/footer.wrapper";
import { LibraryIcon } from "lucide-react";
import { Suspense } from "react";

/**
 * Renders the Home page layout containing the "MeowAni" title and a call-to-action link.
 *
 * @returns The React element for the Home page: a centered container with a card-like main area that displays the "MeowAni" heading and a rounded "Library" link to `/library`.
 */
export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex gap-5 w-full max-w-3xl mx-auto flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
        <span className="truncate leading-tight text-xl font-extrabold font-stretch-100%">
          MeowAni
        </span>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/library"
            rel="noopener noreferrer"
          >
            <LibraryIcon />
            Library
          </a>
        </div>
      </main>

      <FooterClient />
    </div>
  );
}
