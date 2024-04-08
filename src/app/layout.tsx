import { ApiProvider } from "@/components/ApiProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

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
  console.log("stuf happen");
  return (
    <html lang="en">
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
          <ApiProvider>{children}</ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
