import { supabase } from "@/lib/supabase";

// IPO CSV取込
export async function importIpoCsv(
  rows: any[]
) {

  for (const row of rows) {

    // 既存検索
    const { data: existing } =
      await supabase
        .from("ipo_master")
        .select("ipo_id")
        .eq(
          "security_code",
          row.security_code
        )
        .maybeSingle();

    // 登録データ
    const ipoData = {
      security_code:
        row.security_code,
      company_name:
        row.company_name,
      listing_market:
        row.market,
      bb_start:
        row.bb_start,
      bb_end:
        row.bb_end,
      listing_date:
        row.listing_date,
      public_price:
        Number(
          row.public_price
        ),
      ipo_rating:
        row.ipo_rating,
      data_source:
        "CSV",
    };

    // 既存のsecurity_codeに存在する場合、UPDATE
    if (existing) {

      const { error } =
        await supabase
          .from("ipo_master")
          .update(ipoData)
          .eq(
            "ipo_id",
            existing.ipo_id
          );

      if (error) {
        throw error;
      }

    }
    // 既存のsecurity_codeに存在しない場合、INSERT
    else {

      const { error } =
        await supabase
          .from("ipo_master")
          .insert(ipoData);

      if (error) {
        throw error;
      }
    }
  }
}