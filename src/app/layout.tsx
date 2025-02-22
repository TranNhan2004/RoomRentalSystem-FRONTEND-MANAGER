import type { Metadata } from "next";
import { Aleo } from "next/font/google"; 
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "sweetalert2/src/sweetalert2.scss";

const aleo = Aleo({
  variable: "--font-aleo", 
  subsets: ["vietnamese"], 
});

export const metadata: Metadata = {
  title: {
    default: "Manager",
    template: "Manager | %s",
  },
  description: "Rental room finding system in Can Tho",
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
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </body>
    </html>
  );
}