"use client";

import { ReactNode } from "react";

/**
 * Headerコンポーネント
 *
 * 【役割】
 * ・アプリケーションタイトル表示
 * ・右上領域に任意コンテンツ表示
 */
type HeaderProps = {
  children?: ReactNode;
};


export default function Header({
  children,
}: HeaderProps) {
  return (
    <header
      className="
        flex
        items-center
        gap-3
        border-b
        px-4
        py-3
      "
    >
      {children}

      <h1 className="text-xl font-bold">
        Asset IPO
      </h1>
    </header>
  );
}
