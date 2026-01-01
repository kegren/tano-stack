import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { User } from "better-auth";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { DefaultNotFound } from "@/components/default-not-found";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import { env } from "@/lib/client/env";
import { SITE_NAME } from "@/lib/constants";
import appCss from "@/styles.css?url";

type MyRouterContext = {
  queryClient: QueryClient;
  user?: User;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: SITE_NAME,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: DefaultNotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
          <Toaster />
          {env.VITE_NODE_ENV === "development" ? (
            <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
          ) : null}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
