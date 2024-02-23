
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import SideBar from "@/components/SideBar";
import StateContext, { Context } from "@/context/context";
import LayoutProvider from "@/components/LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reconnecting",
  description: "Develop by Wai Min Hein",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en">
      <body className={inter.className}>
        
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
