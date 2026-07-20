import { supabase } from "@/lib/supabase";

// 検索条件
type SearchCondition = {
  companyName?: string;
  ipoStatusCode?: string;
  bbDate?: string;
  listingDate?: string;
};

// IPO一覧取得
export async function getIpoList(
  condition?: SearchCondition
) {
  // ベースクエリ
  let query = supabase
    .from("v_ipo_master")
    .select("*");
  // 企業名（あいまい検索）
  if (condition?.companyName) {
    query = query.ilike(
      "company_name",
      `%${condition.companyName}%`
    );
  }

  // IPO状態（未選択は検索しない）
  if (
    condition?.ipoStatusCode &&
    condition.ipoStatusCode !== ""
  ) {
    query = query.eq(
      "ipo_status_code",
      condition.ipoStatusCode
    );
  }

  // BB期間
  // 入力日が bb_start ～ bb_end の範囲内
  if (
    condition?.bbDate &&
    condition?.bbDate != ""
  ) {
    query = query
      .lte("bb_start", condition.bbDate)
      .gte("bb_end", condition.bbDate);
  }

  // 上場日
  // 入力日以降
  if (
    condition?.listingDate &&
    condition?.listingDate != ""
  ) {
    query = query.gte(
      "listing_date",
      condition.listingDate
    );
  }

  return await query.order(
    "listing_date",
    { ascending: false }
  );
}
