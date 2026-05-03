import { Footer } from "@/components/custom/footer";
import { cn } from "@/lib/shadcn/utils";
import { Suspense } from "react";

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
