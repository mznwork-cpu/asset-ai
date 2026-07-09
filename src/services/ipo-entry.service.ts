import { supabase } from "@/lib/supabase";

/**
 * IPO申込情報取得
 */
export async function getIpoEntries(
  userId: string
) {
  return await supabase
    .from("v_ipo_entry")
    .select("*")
    .eq("user_id", userId);
}

// CREATE OR REPLACE VIEW v_ipo_entry AS
// SELECT
//     ie.ipo_entry_id
//    ,ie.user_id
//    ,ie.ipo_id
//    ,ie.security_company_id
//    ,sc.security_company_name
//    ,ie.entry_status_code
//    ,cm_ents.code_name AS entry_status_name
//    ,ie.lottery_result_code
//    ,cm_lr.code_name AS lottery_result_name
//    ,ie.applied_shares
//    ,ie.required_amount
//    ,ie.applied_at
//    ,ie.result_confirmed_at
//    ,ie.memo
//    ,ie.created_at
//    ,ie.updated_at
// FROM
//     ipo_entries ie
//     LEFT JOIN securities_companies sc
//         ON ie.security_company_id = sc.security_company_id
//     LEFT JOIN code_master cm_ents
//         ON ie.entry_status_code = cm_ents.code
//        AND cm_ents.code_category = 'entry_status'
//     LEFT JOIN code_master cm_lr
//         ON ie.lottery_result_code = cm_lr.code
//        AND cm_lr.code_category = 'lottery_result';