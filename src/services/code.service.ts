import { supabase } from "@/lib/supabase";

/**
 * コードマスタ取得
 */
export async function getCodeList(
  codeCategory: string
) {
  return await supabase
    .from("code_master")
    .select("*")
    .eq("code_category", codeCategory)
    .order("display_order");
}