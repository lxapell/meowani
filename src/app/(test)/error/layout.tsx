import { Suspense } from "react";

/**
 * Wraps its children in a React Suspense boundary that shows a simple fallback UI while descendants suspend.
 *
 * @param children - Content rendered inside the layout's Suspense boundary.
 * @returns A React element that renders `children` inside a Suspense boundary with a fallback UI.
 */
export default function TestErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Shi</div>}>{children}</Suspense>;
}
