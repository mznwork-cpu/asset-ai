import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("ipo_master")
    .select("*")
    .order("listing_date");

  return (
    <main>
      <h1>IPO一覧</h1>

      {error && (
        <p>エラー: {error.message}</p>
      )}

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}