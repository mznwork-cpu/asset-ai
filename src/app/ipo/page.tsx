// import Servise
import { getCurrentUser } from "@/services/auth.service";
import { getIpoList } from "@/services/ipo.service";
import { getIpoEntries } from "@/services/ipo-entry.service";
import { getCodeList } from "@/services/code.service";
// import Commponents
import IpoAccordion from "@/components/IpoAccordion";
import { Button } from "@/components/ui/button";

export default async function IpoPage() {
  // codeマスタからリスト取得
  const {
    data: entryStatusList,
  } = await getCodeList(
    "entry_status"
  );
  const {
    data: lotteryResultList,
  } = await getCodeList(
    "lottery_result"
  );
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
          <label> 企業名 </label>
        </div>
        <div>
          <label> IPO状態 </label>
        </div>
        <Button>
          検索
        </Button>
      </div>
      {/* 一覧表示 */}
        <IpoAccordion
          ipoList={ipoList}
          entryMap={entryMap}
          entryStatusList={entryStatusList ?? []}
          lotteryResultList={lotteryResultList ?? []}
        /> 
    </div>
  );
}