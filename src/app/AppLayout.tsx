"use client";

import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";

/**
 * 共通レイアウト
 *
 * 【役割】
 * ・ヘッダー表示
 * ・サイドメニュー表示
 * ・画面コンテンツ表示
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <SideMenu />
      </Header>

      <main className="p-4">
        {children}
      </main>
    </>
  );
}