"use client";

import Link from "next/link";

/**
 * サイドメニューコンポーネント
 *
 * 【役割】
 * ・画面遷移メニュー表示
 * ・モバイル向けスライドメニュー表示
 *
 * 【表示メニュー】
 * ・IPO一覧
 * ・CSV取込
 * ・ログアウト
 */
type SideMenuProps = {
  /**
   * メニュー表示状態
   */
  isOpen: boolean;

  /**
   * メニューを閉じる処理
   */
  onClose: () => void;
};

export default function SideMenu({
  isOpen,
  onClose,
}: SideMenuProps) {
  return (
    <>
      {/* 背景オーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={onClose}
        />
      )}

      {/* サイドメニュー本体 */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-full
          w-64
          border-r
          bg-white
          transition-transform
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="p-4">
          {/* タイトル */}
          <h2 className="mb-6 text-lg font-bold">
            メニュー
          </h2>

          {/* メニュー一覧 */}
          <nav className="flex flex-col gap-3">
            {/* IPO一覧 */}
            <Link href="/ipo">
                IPO一覧
            </Link>

            {/* CSV取込 */}
            <Link href="/csv-import">
                CSV取込
            </Link>

            {/* ログアウト（Phase2では未実装） */}
            <button
              type="button"
              className="
                rounded
                px-3
                py-2
                text-left
                hover:bg-gray-100
              "
            >
              ログアウト
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}
