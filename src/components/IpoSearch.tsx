// クライアントコンポーネント
"use client";
// import
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  ipoStatusList: any[];
};

export default function IpoSearch({
  ipoStatusList,
}: Props) {
// 検索条件
  const [companyName, setCompanyName] = useState("");
  const [ipoStatusCode, setIpoStatusCode] = useState("");
  const [ipoStatusName, setIpoStatusName] = useState("");
  const [bbDate, setBbDate] = useState("");
  const [listingDate, setListingDate] = useState("");
  return (
    <div className="border rounded p-4 space-y-4">
      <div className="space-y-3">

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
      </div>

      <Button
        onClick={() => {
          console.log({
            companyName,
            ipoStatusCode,
            bbDate,
            listingDate,
          });
        }}
      >
        検索
      </Button>
    </div>
  );
}