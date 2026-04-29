import NavWithBreadcrumb from "./nav-with-breadcrumb";

/**
 * Layout component that wraps its content with the `NavWithBreadcrumb` navigation container.
 *
 * @param children - The content to render inside the layout.
 * @returns A React element that renders `children` inside a `NavWithBreadcrumb` wrapper.
 */
export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NavWithBreadcrumb>{children}</NavWithBreadcrumb>;
}
