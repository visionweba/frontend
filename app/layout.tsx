import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const sora = Sora({ subsets: ["latin"], variable: "--font-display", weight: ["400", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Voltique — Premium Electronics",
  description: "Shop the latest mobiles, laptops, audio and more at Voltique.",
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
