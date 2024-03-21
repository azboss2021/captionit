import type { Metadata } from "next";
import {
  // Merriweather,
  Montserrat,
  // Open_Sans,
  // Playfair_Display,
  // Poppins,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/components/auth-provider";
import { SAAS_NAME, SAAS_SLOGAN } from "@/lib/constants";
import PageLoadProgressBar from "@/components/PageLoadProgressBar";
import { Toaster } from "react-hot-toast";

// const open_sans = Open_Sans({
//   subsets: [
//     "cyrillic",
//     "cyrillic-ext",
//     "greek",
//     "greek-ext",
//     "hebrew",
//     "latin",
//     "latin-ext",
//     "math",
//     "symbols",
//     "vietnamese",
//   ],
// });

// const merriweather = Merriweather({
//   weight: ["300", "400", "700", "900"],
//   subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
// });

// const playfair_display = Playfair_Display({
//   subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
// });

const montserrat = Montserrat({
  subsets: ["cyrillic"],
});

// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["devanagari", "latin", "latin-ext"],
// });

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
      <body className={montserrat.className}>
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
