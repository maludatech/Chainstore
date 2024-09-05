import type { Metadata } from "next";
// import Navbar from "./components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "./thirdweb";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chain Store",

  description: "The ultimate Web3 store for you",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          
        {children}
        </ThirdwebProvider>
        
        </body>
    </html>
  );
}
