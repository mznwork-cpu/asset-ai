"use client";

/**
 * Headerコンポーネント
 *
 * 【役割】
 * ・アプリケーションタイトル表示
 * ・サイドメニュー開閉ボタン表示
 *
 * 【使用箇所】
 * ・全画面共通レイアウト
 */
type HeaderProps = {
  /**
   * メニューボタン押下時の処理
   */
  onMenuClick: () => void;
};

export default function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        border-b
        px-4
        py-3
      "
    >
      {/* アプリケーション名 */}
      <h1 className="text-xl font-bold">
        Asset IPO
      </h1>

      {/* ハンバーガーメニュー */}
      <button
        type="button"
        onClick={onMenuClick}
        className="text-2xl"
      >
        ☰
      </button>
    </header>
  );
}