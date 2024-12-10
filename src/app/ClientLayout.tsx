"use client";

import { Toaster } from "@/components/ui/toaster";

export default function ClientLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
