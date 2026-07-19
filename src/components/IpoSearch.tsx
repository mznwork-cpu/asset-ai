// クライアントコンポーネント
"use client";
// import
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  // IPO状態一覧
  ipoStatusList: any[];

  // 検索条件初期値
  initialCompanyName: string;
  initialIpoStatusCode: string;
  initialBbDate: string;
  initialListingDate: string;
};

// 
export default function IpoSearch({
  ipoStatusList,
  initialCompanyName,
  initialIpoStatusCode,
  initialBbDate,
  initialListingDate,
}: Props) {
  // 検索条件
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [ipoStatusCode, setIpoStatusCode] = useState(initialIpoStatusCode);
  const [ipoStatusName, setIpoStatusName] = useState("");
  const [bbDate, setBbDate] = useState(initialBbDate);
  const [listingDate, setListingDate] = useState(initialListingDate);
  // URL遷移
  const router = useRouter();

// 画面
return (
    <div className="border rounded p-4 space-y-4">

      {/* 企業名 */}
      <div className="flex items-center gap-2">
        <label className="w-24">企業名</label>
          <Input
            placeholder="企業名"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
          />
      </div>

      {/* IPO状態 */}
      <div className="flex items-center gap-2">
        <label className="w-20">IPO状態</label>
          <Select
            value={ipoStatusName}
            onValueChange={(value) => {

              // 選択行取得
              const selectedItem =
                ipoStatusList.find(
                  (item: any) =>
                    item.code_name === value
                );

              // 検索用コード保持
              setIpoStatusCode(
                selectedItem?.code ?? ""
              );

              // 画面表示用名称保持
              setIpoStatusName(value ?? "");
            }}
          >
          <SelectTrigger>
            <SelectValue placeholder="すべて" />
          </SelectTrigger>

          <SelectContent>
            {ipoStatusList?.map(
              (item: any) => (
                <SelectItem
                  key={item.code}
                  value={item.code_name}
                >
                  {item.code_name}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* BB期間 */}
      <div className="flex items-center gap-2">
        <label className="w-36">BB期間</label>
          <Input
            type="date"
            value={bbDate}
            onChange={(e) =>
              setBbDate(e.target.value)
            }
          />
      </div>

      {/* 上場日 */}
      <div className="flex items-center gap-2">
        <label className="w-36">上場日以降</label>
          <Input
            type="date"
            value={listingDate}
            onChange={(e) =>
              setListingDate(e.target.value)
            }
          />
      </div>
      
      {/* 検索ボタン */}
      <Button
        onClick={() => {
          //  検索条件
          const params = new URLSearchParams();
          if (companyName) {
            params.set(
              "companyName", companyName
            );
          }
          if (ipoStatusCode) {
            params.set(
              "ipoStatusCode", ipoStatusCode
            );
          }
          if (bbDate) {
            params.set(
              "bbDate", bbDate
            );
          }
          if (listingDate) {
            params.set(
              "listingDate", listingDate
            );
          }

          // 検索実行
          router.push(
            `/ipo?${params.toString()}`
          );
        }}
      >
        検索
      </Button>
    </div>
  );
}