import { supabase } from "@/lib/supabase";
/**
 * IPO一覧取得
 */
export async function getIpoList() {
  return await supabase
    .from("v_ipo_master")
    .select("*")
    .order("listing_date", { ascending: false });
}

// CREATE OR REPLACE VIEW v_ipo_master AS
// SELECT
        // po_id
//     im.ipo_id
        // 証券会社CD
//    ,im.security_code
        // 企業名
//    ,im.company_name
        // 上場市場
//    ,im.listing_market
        // 業種名
//    ,im.industry_name
        // BB開始日
//    ,im.bb_start
        // BB終了日
//    ,im.bb_end
        // 上場日
//    ,im.listing_date
        // 主幹事
//    ,im.lead_manager
        // 公開価格
//    ,im.public_price
        // 単元株数
//    ,im.unit_shares
        // 必要資金
//    ,im.required_amount
        // IPO評価
//    ,im.ipo_rating
        // IPO状態コード
//    ,im.ipo_status_code
        // IPO状態名
//    ,cm_iposc.code_name AS ipo_status_name
        // データ取得元
//    ,im.data_source
//    ,im.created_at
//    ,im.updated_at
// FROM
//     ipo_master im
//     LEFT JOIN code_master cm_iposc
//         ON im.ipo_status_code = cm_iposc.code
//        AND cm_iposc.code_category = 'ipo_status';
