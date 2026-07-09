import { getCurrentUser } from "@/services/auth.service";
import { getIpoList } from "@/services/ipo.service";
import { getIpoEntries } from "@/services/ipo-entry.service";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function IpoPage() {
  // IPOリストの取得
  const { 
    data:ipoList,
    error:ipoError,
  } = await getIpoList();
  if (ipoError) {
    return (
      <div>
        エラー: {ipoError.message}
      </div>
    );
  }
  // USER_ID取得してIPOEntryリストの取得
  const { 
    user 
  } = await getCurrentUser();
  const { 
    data:ipoEntries, 
    error:entryError,
  } = await getIpoEntries(user.id);
  if (entryError) {
    return (
      <div>
        エラー: {entryError.message}
      </div>
    );
  }
  // IPOリストとIPOEntryのマージ
  const entryMap = new Map();
  ipoEntries?.forEach((entry) => {
    const entries =
      entryMap.get(entry.ipo_id) ?? [];

    entries.push(entry);

    entryMap.set(
      entry.ipo_id,
      entries
    );
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        IPO一覧
      </h1>
      {/* 検索エリア */}
      <div className="border rounded p-4 space-y-4">
        <div>
          <label>
            証券コード
          </label>
          <input
            className="border ml-2 px-2 py-1"
            type="text"
          />
        </div>

        <div>
          <label>
            企業名
          </label>
          <input
            className="border ml-2 px-2 py-1"
            type="text"
          />
        </div>

        <button
          className="border px-4 py-2"
        >
          検索
        </button>
      </div>

      {/* 一覧表示 */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">
              証券CD
            </th>
            <th className="border p-2">
              企業名
            </th>
            <th className="border p-2">
              BB期間
            </th>
            <th className="border p-2">
              上場日
            </th>
          </tr>
        </thead>

        <tbody>
          {ipoList?.map((ipo) => {
            const entries = entryMap.get(ipo.ipo_id) ?? [];
            return(
              <tr key={ipo.ipo_id}>
               <td className="border p-2">
                  {/* 証券CD */}
                  {ipo.security_code}
                </td>
                <td className="border p-2">
                  {/* 企業名 */}
                  {ipo.company_name}
                </td>
                <td className="border p-2">
                  {/* BB開始 と 終了 */}
                  {ipo.bb_start} / {ipo.bb_end}
                </td>
                <td className="border p-2">
                  {/* 上場日 */}
                  {ipo.listing_date}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div>
        Entry Count: {ipoEntries?.length}
      </div>
      <pre>
        {JSON.stringify(
          Array.from(entryMap.entries()),
          null,
          2
        )}
      </pre> */}
    </div>
  );
}