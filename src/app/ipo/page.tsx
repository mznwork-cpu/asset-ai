// キャッシュなしで毎回サーバで再生成
export const dynamic = "force-dynamic";
// import Servise
import { getCurrentUser } from "@/services/auth.service";
import { getIpoList } from "@/services/ipo.service";
import { getIpoEntries } from "@/services/ipo-entry.service";
import { getCodeList } from "@/services/code.service";
import { getUserSecuritiesCompanies } from "@/services/securities-company.service"
// import Commponents
import { Button } from "@/components/ui/button";
import IpoAccordion from "@/components/IpoAccordion";
import IpoSearch from "@/components/IpoSearch";

export default async function IpoPage() {
  // USER_ID取得してIPOEntryリストの取得
  const { 
    user 
  } = await getCurrentUser();
  // codeマスタからリスト取得
  // 申込状態
  const {
    data: entryStatusList,
  } = await getCodeList(
    "entry_status"
  );
  // 抽選結果
  const {
    data: lotteryResultList,
  } = await getCodeList(
    "lottery_result"
  );
  // IPO状態
  const {
   data: ipoStatusList,
  } = await getCodeList(
    "ipo_status"
  );
  // ユーザ証券会社一覧取得
  const {
    data: securitiesCompanies,
  } = await getUserSecuritiesCompanies(
    user.id
  );  // IPOリストの取得
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
        <IpoSearch
          ipoStatusList={
              ipoStatusList ??[]
          }
        />
      {/* 一覧表示 */}
        <IpoAccordion
          userId={user.id}
          ipoList={ipoList}
          entryMap={entryMap}
          securitiesCompanies={securitiesCompanies ??[]}
          entryStatusList={entryStatusList ?? []}
          lotteryResultList={lotteryResultList ?? []}
        /> 
    </div>
  );
}