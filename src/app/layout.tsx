import type { Metadata } from "next";
import "./globals.css";
import "./energy-system.css";

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
    <html lang="en" className="dark">
      <body className="dark">{children}</body>
    </html>
  );
}