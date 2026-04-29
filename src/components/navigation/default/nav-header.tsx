"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

/**
 * Render a clickable sidebar header that links to "/" and displays the application's logo and name.
 *
 * @param app - Application metadata for the header.
 * @param app.name - The visible name of the application.
 * @param app.logo - URL or path to the application's logo image.
 * @param app.plan - Plan identifier for the application (present in props but not used in rendering).
 * @returns The JSX element for the sidebar navigation header linking to the root and showing the app logo and name.
 */
export function NavHeader({
  app,
}: {
  app: {
    name: string;
    logo: string;
    plan: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[active=true]:bg-transparent hover:bg-transparent hover:text-inherit active:bg-transparent"
          asChild
        >
          <Link href="/">
            <Image
              src={app.logo}
              alt={app.name}
              width={32}
              height={32}
              className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground object-cover"
            />
            <div className="grid flex-1 text-start text-xl leading-tight">
              <span className="truncate font-extrabold font-stretch-100%">
                {app.name}
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
