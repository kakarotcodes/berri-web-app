import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Berri",
  description:
    "AI-powered analytics platform that transforms your data into actionable business intelligence.",
  icons: {
    icon: "/assets/logos/logo1_top_left.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
