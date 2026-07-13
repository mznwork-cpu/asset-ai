import { supabase } from "@/lib/supabase";

/**
 * ユーザー利用証券会社一覧取得
 */
export async function getUserSecuritiesCompanies(
  userId: string
) {
  return await supabase
    .from("v_user_securities_companies")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("display_order");
}

// CREATE OR REPLACE VIEW v_user_securities_companies AS
// select
//     us.user_id
//     ,us.security_company_id
//     ,cs.security_company_name
//     ,cs.display_order
//     ,us.account_no
//     ,us.is_active

// from
//     user_securities_companies us
//     left join securities_companies cs
//         on us.security_company_id = cs.security_company_id
// where
//     cs.is_active = true
