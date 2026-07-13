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
