import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const sora = Sora({ subsets: ["latin"], variable: "--font-display", weight: ["400", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Vision Edge Business | Premium Electronics Store",
  description:
    "Vision Edge Business offers premium electronics including smartphones, laptops, accessories, audio devices, and more at competitive prices.",
  keywords: [
    "Vision Edge Business",
    "Electronics Store",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Online Shopping",
    "VisionEdgeBusiness",
  ],
  metadataBase: new URL("https://visionedgebusiness.com"),
  openGraph: {
    title: "Vision Edge Business | Premium Electronics Store",
    description:
      "Shop the latest mobiles, laptops, accessories, and premium electronics at Vision Edge Business.",
    url: "https://visionedgebusiness.com",
    siteName: "Vision Edge Business",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision Edge Business | Premium Electronics Store",
    description:
      "Discover the latest electronics and gadgets at Vision Edge Business.",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable} font-[family-name:var(--font-body)] antialiased`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
