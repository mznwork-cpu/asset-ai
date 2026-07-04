"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";

/**
 * 共通レイアウト
 *
 * 【役割】
 * ・ヘッダ表示
 * ・サイドメニュー表示
 * ・各画面コンテンツ表示
 *
 * Phase2の全画面共通レイアウト
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * サイドメニュー開閉状態
   *
   * true : 開く
   * false : 閉じる
   */
  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <>
      {/* 共通ヘッダ */}
      <Header
        onMenuClick={() =>
          setMenuOpen(true)
        }
      />

      {/* サイドメニュー */}
      <SideMenu
        isOpen={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />

      {/* 各画面のコンテンツ */}
      <main className="p-4">
        {children}
      </main>
    </>
  );
}