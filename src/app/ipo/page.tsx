// import
import { getCurrentUser } from "@/services/auth.service";
import { getIpoList } from "@/services/ipo.service";
import { getIpoEntries } from "@/services/ipo-entry.service";
import { getCodeList } from "@/services/code.service";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          <label>
            企業名
          </label>
          <input
            className="border ml-2 px-2 py-1"
            type="text"
          />
        </div>
        <div>
          <label>IPO状態</label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="すべて" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                すべて
              </SelectItem>

              <SelectItem value="before">
                BB前
              </SelectItem>

              <SelectItem value="bb">
                BB期間中
              </SelectItem>

              <SelectItem value="listed">
                上場済
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button
          className="border px-4 py-2"
        >
          検索
        </button>
      </div>
      {/* 一覧表示 */}
      <Accordion>
        {ipoList?.map((ipo) => {
          const entries =
            entryMap.get(ipo.ipo_id) ?? [];
          return (
            <AccordionItem
              key={ipo.ipo_id}
              value={ipo.ipo_id}
            >
            <AccordionTrigger  className="bg-slate-200">
              <div className="text-left">
                <div className="font-semibold">
                  {ipo.company_name} 
                  {"  /評価:"} {ipo.ipo_rating}
                  {"  /状態:"} {ipo.ipo_status_name}

                </div>
                <div>
                  {" BB:"}
                  {ipo.bb_start}
                  {" - "}
                  {ipo.bb_end}
                {/* </div>
                <div> */}
                  {"  /上場:"}
                  {ipo.listing_date}
                  {"  /価格:"}
                  {ipo.public_price}
                </div>
              </div>
            </AccordionTrigger>
              <AccordionContent>
                {/* IPO詳細あればここに記載する */}
                <hr />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>証券会社</TableHead>
                        <TableHead>申込株数</TableHead>
                        <TableHead>申込状態</TableHead>
                        <TableHead>抽選結果</TableHead>
                        <TableHead>メモ</TableHead>
                      </TableRow>
                    </TableHeader> 
                    <TableBody>
                      {entries.map((entry: any) => (
                        <TableRow
                          key={entry.ipo_entry_id}
                        >
                          <TableCell>
                            {entry.security_company_name}
                          </TableCell>

                          <TableCell>
                            <Input
                              defaultValue={
                                entry.applied_shares?.toString()
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <Select>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {entryStatusList?.map((item) => (
                                  <SelectItem
                                    key={item.code}
                                    value={item.code}
                                  >
                                    {item.code_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                          </TableCell>

                          <TableCell>
                            {entry.lottery_result_name}
                          </TableCell>

                          <TableCell>
                            {entry.memo}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
 
    </div>
  );
}