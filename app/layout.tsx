"use client";

import "material-icons/iconfont/material-icons.css";
import "./globals.css";

import { SidebarProvider } from "@/contexts/SidebarContext";

import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Navbar />
          <main>
            <Sidebar />
            {children}
          </main>
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
