import ReactQueryProvider from "@/reactQuery/Provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import Gap from "../components/Gap";
import Nav from "../components/nav/Nav";
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
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
        <Footer />
      </body>
    </html>
  );
}
