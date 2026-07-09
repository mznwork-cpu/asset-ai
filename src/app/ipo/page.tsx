import { getIpoList } from "@/services/ipo.service";

export default async function IpoPage() {
  const { data, error } = await getIpoList();
  if (error) {
    return (
      <div>
        エラー: {error.message}
      </div>
    );
  }

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
              証券コード
            </th>
            <th className="border p-2">
              企業名
            </th>
            <th className="border p-2">
              市場
            </th>
            <th className="border p-2">
              上場日
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((ipo) => (
            <tr key={ipo.ipo_id}>
              <td className="border p-2">
                {ipo.security_code}
              </td>

              <td className="border p-2">
                {ipo.company_name}
              </td>

              <td className="border p-2">
                {ipo.listing_market}
              </td>

              <td className="border p-2">
                {ipo.listing_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}