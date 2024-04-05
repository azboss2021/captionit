import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/components/auth-provider";
import { SAAS_NAME, SAAS_SLOGAN } from "@/lib/constants";
import PageLoadProgressBar from "@/components/PageLoadProgressBar";
import { Toaster } from "react-hot-toast";
import { poppins, inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: SAAS_NAME,
  description: SAAS_SLOGAN,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PageLoadProgressBar>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </PageLoadProgressBar>
      </body>
    </html>
  );
}
