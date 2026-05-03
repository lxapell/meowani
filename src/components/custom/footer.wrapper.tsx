import { Footer } from "@/components/custom/footer";
import { cn } from "@/lib/shadcn/utils";
import { Suspense } from "react";

/**
 * Renders the site's Footer component, forwarding and composing the optional `className`.
 *
 * @param className - Optional CSS class string forwarded to `Footer`; it is composed with `cn`
 * @returns The rendered `Footer` element with the composed `className`
 */
export default function FooterClient({
  className,
}: React.ComponentPropsWithoutRef<"div">) {
  // return (
  //   {/* <Suspense fallback={<div>Banna</div>}> */}
  //   {/*   <Footer className={cn(className)} /> */}
  //   {/* </Suspense> */}
  //     );
  return <Footer className={cn(className)} />;
}
