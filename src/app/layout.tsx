import { ApiProvider } from "@/components/ApiProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
  openGraph: {
    title: "CorgiCal",
    description: "CorgiCal events",
    url: "https://nextjs.org",
    siteName: "",
    images: [
      {
        url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnNxZTVja3I4ZGE2cHQydHkzamR3bDJ3YWhmaDB1eDBncXc2Zm9maCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/geDdVatJFD2H4CkqAj/giphy.gif",
        width: 800,
        height: 600,
      },
      {
        url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnNxZTVja3I4ZGE2cHQydHkzamR3bDJ3YWhmaDB1eDBncXc2Zm9maCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/geDdVatJFD2H4CkqAj/giphy.gif",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex-col flex",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-2 right-2">
            <ModeToggle />
          </div>
          <ApiProvider>{children}</ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
