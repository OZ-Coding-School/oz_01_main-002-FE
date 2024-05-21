import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../_components/Footer";
import Gap from "../_components/Gap";
import Nav from "../_components/Nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "명품관",
  description: "대한민국 1등 명품 경매장",
  icons: {
    icon: '/fav.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={inter.className}
      >
        <Nav />
        <Gap />
        {children}
        <Footer />
      </body>
    </html>
  );
}
