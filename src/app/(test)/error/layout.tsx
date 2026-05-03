import { Suspense } from "react";

export default function TestErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Shi</div>}>{children}</Suspense>;
}
