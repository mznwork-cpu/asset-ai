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
  return (
    <div className="border rounded p-4 space-y-4">
      <div className="space-y-3">

      {/* 企業名 */}
      <div className="flex items-center gap-2">
        <label className="w-24">企業名</label>
        <Input
          placeholder="企業名"
        />
      </div>

      {/* IPO状態 */}
      <div className="flex items-center gap-2">
        <label className="w-20">IPO状態</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="すべて" />
          </SelectTrigger>

          <SelectContent>
            {ipoStatusList?.map(
              (item: any) => (
                <SelectItem
                  key={item.code}
                  value={item.code}
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
        <label className="w-36">BB期</label>
        <Input
          type="date"
        />
      {/* </div> */}

      {/* 上場日 */}
      {/* <div className="flex items-center gap-2"> */}
        <label className="w-36">上場～</label>
        <Input
          type="date"
        />
      </div>
      </div>

      <Button>
        検索
      </Button>
    </div>
  );
}