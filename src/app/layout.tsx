import "./globals.css";
import AppLayout from "./AppLayout";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


/**
 * Next.jsルートレイアウト
 *
 * 【役割】
 * アプリ全体の共通レイアウト設定
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}