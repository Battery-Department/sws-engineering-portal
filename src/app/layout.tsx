import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Battery Department Dashboard",
  description: "Comprehensive account management for Battery Department",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}