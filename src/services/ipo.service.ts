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

// CREATE OR REPLACE VIEW v_ipo_master AS
// SELECT
//     im.ipo_id
//    ,im.security_code
//    ,im.company_name
//    ,im.listing_market
//    ,im.industry_name
//    ,im.bb_start
//    ,im.bb_end
//    ,im.listing_date
//    ,im.lead_manager
//    ,im.public_price
//    ,im.unit_shares
//    ,im.required_amount
//    ,im.ipo_rating
//    ,im.ipo_status_code
//    ,cm_iposc.code_name AS ipo_status_name
//    ,im.data_source
//    ,im.created_at
//    ,im.updated_at
// FROM
//     ipo_master im
//     LEFT JOIN code_master cm_iposc
//         ON im.ipo_status_code = cm_iposc.code
//        AND cm_iposc.code_category = 'ipo_status';
