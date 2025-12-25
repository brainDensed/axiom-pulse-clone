"use client";

import Navbar from "@/components/Navbar";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Theme
        accentColor="blue"
        hasBackground
        panelBackground="solid"
        appearance="dark"
      >
        <div className="pb-24 md:pb-0 md:pt-28">
          <Navbar />
          {children}
        </div>
      </Theme>
    </QueryClientProvider>
  );
}
