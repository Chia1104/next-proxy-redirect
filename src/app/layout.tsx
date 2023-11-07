import "./globals.css";
import type { ReactNode } from "react";
import RootProvider from "./_component/root-provider";

export const metadata = {
  title: "Next App",
  description: "Generated by @chia-stack/nextjs-app template",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}