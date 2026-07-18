import { supabase } from "@/lib/supabase";

// IPO申込情報取得
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

// IPO申込情報置換
// DELETE → INSERTで再作成
export async function replaceIpoEntries(
  userId: string,
  ipoId: string,
  entries: any[]
) {
  // 既存削除
  const { error: deleteError } =
    await supabase
      .from("ipo_entries")
      .delete()
      .eq("user_id", userId)
      .eq("ipo_id", ipoId);

  if (deleteError) {
    throw deleteError;
  }

  // INSERTデータ作成
  const insertRows = entries.map(
    (entry) => ({
      user_id: userId,
      ipo_id: ipoId,
      security_company_id:
        entry.security_company_id,
      entry_status_code:
        entry.entry_status_code,
      lottery_result_code:
        entry.lottery_result_code,
      applied_shares:
        Number(
          entry.applied_shares ?? 0
        ),
      memo:
        entry.memo ?? null,
    })
  );

  // 新規登録
  const { error: insertError } =
    await supabase
      .from("ipo_entries")
      .insert(insertRows);

  if (insertError) {
    throw insertError;
  }
}