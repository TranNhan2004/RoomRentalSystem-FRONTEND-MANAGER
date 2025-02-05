import type { Metadata } from "next";
import { Aleo } from "next/font/google"; 
import "./globals.css";

const aleo = Aleo({
  variable: "--font-aleo", 
  subsets: ["vietnamese"], 
});

export const metadata: Metadata = {
  title: "Management",
  description: "Hệ thống quản lý cho thuê phòng trọ tại TP Cần Thơ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${aleo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}