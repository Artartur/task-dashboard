import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Dashboard",
  description: "Create the tasks you need to do",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
