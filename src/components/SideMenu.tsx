"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * サイドメニュー
 *
 * 【役割】
 * ・画面遷移メニュー表示
 * ・ハンバーガーメニュー表示
 */
export default function SideMenu() {

  const [open, setOpen] = useState(false);

  return (
    <Sheet 
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger className="flex items-center">
        <Menu className="h-6 w-6" />
      </SheetTrigger>

      <SheetContent side="left">
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/ipo" onClick={()=>setOpen(false)}>
            　　IPO一覧
          </Link>

          <Link href="/csv-import" onClick={()=>setOpen(false)}>
            　　CSV取込
          </Link>

          <button
            // type="button"
            // className="
            //   rounded
            //   px-3
            //   py-2
            //   text-left
            //   hover:bg-gray-100
            // "
          >
            ログアウト
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}