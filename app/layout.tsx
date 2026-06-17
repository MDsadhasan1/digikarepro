import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "dogikarepro — Smart Care, Smart Shopping",
    template: "%s | dogikarepro",
  },
  description:
    "dogikarepro — Bangladesh's premium e-commerce destination. Shop the best products with secure payment, fast delivery and dedicated support.",
  keywords: ["dogikarepro", "online shopping", "bangladesh", "e-commerce", "buy online"],
  authors: [{ name: "dogikarepro" }],
  creator: "dogikarepro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "dogikarepro",
    title: "dogikarepro — Smart Care, Smart Shopping",
    description:
      "Bangladesh's premium e-commerce destination. Shop the best products with fast delivery.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "dogikarepro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "dogikarepro",
    description: "Bangladesh's premium e-commerce destination.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo-icon.svg",
    shortcut: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: { borderRadius: "0.75rem" },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
