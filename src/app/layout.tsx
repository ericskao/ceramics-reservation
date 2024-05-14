import { ApiProvider } from "@/components/ApiProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const metadata: Metadata = {
  openGraph: {
    title: "Wilson Park Ceramics",
    description: "Wilson Park Ceramics reservations",
    url: "https://www.wilsonparkceramics.com/g",
    siteName: "Wilson Park Ceramics reservations",
    locale: "en_US",
    type: "website",
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body
        className={cn(
          "min-h-screen font-sans antialiased flex-col flex",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MantineProvider>
            <ApiProvider>{children}</ApiProvider>
            <Notifications />
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
