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

      {/* 企業名 */}
      <div>
        <label>企業名</label>
        <Input
          placeholder="企業名"
        />
      </div>

      {/* IPO状態 */}
      <div>
        <label>IPO状態</label>
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
      <div>
        <label>BB期間</label>
        <Input
          type="date"
        />
      </div>

      {/* 上場日 */}
      <div>
        <label>上場日以降</label>
        <Input
          type="date"
        />
      </div>

      <Button>
        検索
      </Button>
    </div>
  );
}