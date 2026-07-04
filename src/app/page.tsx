import { redirect } from "next/navigation";

/**
 * ルートURL
 *
 * /
 *
 * IPO一覧へリダイレクト
 */
export default function Page() {
  redirect("/ipo");
}