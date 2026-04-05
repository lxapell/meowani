import NavWithBreadcrumb from "@/components/navigation/dynamic-breadcrumb";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NavWithBreadcrumb>{children}</NavWithBreadcrumb>;
}
