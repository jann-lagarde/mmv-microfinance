import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MMV Microfinance & Lending",
  description:
    "Accessible and transparent lending services for BPO and Call Center professionals.",
  keywords: [
    "MMV Microfinance",
    "MMV Lending",
    "Microfinance",
    "BPO Loan",
    "Call Center Loan",
    "Loan Philippines",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.variable}>{children}</body>
    </html>
  );
}