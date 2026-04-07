import NavWithBreadcrumb from "./nav-with-breadcrumb";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NavWithBreadcrumb>{children}</NavWithBreadcrumb>;
}
