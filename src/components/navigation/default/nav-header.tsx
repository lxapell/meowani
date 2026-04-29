"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

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
