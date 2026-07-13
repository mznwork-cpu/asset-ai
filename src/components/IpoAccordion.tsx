"use client";
import { useState } from "react";
// import Commponents
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 受取パラメータ
type Props = {
  ipoList: any[];
  entryMap: Map<any, any>;
  securitiesCompanies: any[];
  entryStatusList: any[];
  lotteryResultList: any[];
};

export default function IpoAccordion({
  ipoList,
  entryMap,
  securitiesCompanies,
  entryStatusList,
  lotteryResultList,
}: Props) {
    /**
     * 編集用のIPOEntry管理
     * 画面上で「追加」「削除」「編集」を行うためのState
     * DBに保存するまではこのStateのみ更新する
     */
    const [entryStateMap, setEntryStateMap] =
    useState(() => {
        const obj: Record<string, any[]> =
        {};

        /**
         * Map → Object変換
         * React Stateとして扱いやすい形へ変換
         */
        entryMap.forEach(
        (value, key) => {
            obj[key] = value;
        }
        );

        return obj;
  });
    return (
    <Accordion>
    {ipoList?.map((ipo) => {
        /**
         * 編集対象のIPOEntry一覧
         * 行追加、行削除、入力変更はこのStateを更新する
         */
        const entries =
            entryStateMap[ipo.ipo_id] ?? [];
        // 証券会社追加ボタン
        const handleAddEntry = (
            ipoId: string
        ) => {
            const currentEntries =
                entryStateMap[ipoId] ?? [];
            const newEntry = {
                ipo_entry_id: crypto.randomUUID(),
                security_company_name: "",
                applied_shares: 100,
                entry_status_code: "",
                entry_status_name: "",
                lottery_result_code: "",
                lottery_result_name: "",
                memo: "",
            };
            setEntryStateMap({
            ...entryStateMap,
            [ipoId]:[...currentEntries,
                newEntry,
            ],
            });
        };
        // 画面
        return (
            <AccordionItem
                key={ipo.ipo_id}
                value={ipo.ipo_id}
            >
                {/* Accodion外側 */}
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
                            {"  /上場:"}
                            {ipo.listing_date}
                            {"  /価格:"}
                            {ipo.public_price}
                        </div>
                    </div>
                </AccordionTrigger>
                    {/* Accodion内側 */}
                    <AccordionContent>
                        {/* Accodionヘッダ */}
                        <div className="mb-4">
                            <Button onClick={() =>
                                handleAddEntry(ipo.ipo_id)
                            }>
                                証券会社追加
                            </Button>
                            <Button>
                                編集保存
                            </Button>
                        </div>
                    <hr />
                    <Table>
                        {/* テーブルタイトル */}
                        {/* <TableHeader>
                            <TableRow>
                            <TableHead>証券会社</TableHead>
                            <TableHead>申込株数</TableHead>
                            <TableHead>申込状態</TableHead>
                            <TableHead>抽選結果</TableHead>
                            <TableHead>メモ</TableHead>
                            </TableRow>
                        </TableHeader> */}
                        {/* テーブル行 */}
                        <TableBody>
                            {entries.map((entry: any) => (
                            <TableRow
                                key={entry.ipo_entry_id}
                            >
                                {/* 証券会社名 */}
                                <TableCell>
                                <Select>
                                    <SelectTrigger>
                                    <SelectValue
                                        placeholder={
                                        entry.security_company_name
                                        }
                                    />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {securitiesCompanies?.map(
                                        (company) => (
                                        <SelectItem
                                            key={
                                            company.security_company_id
                                            }
                                            value={
                                            company.security_company_id.toString()
                                            }
                                        >
                                            {company.security_company_name}
                                        </SelectItem>
                                        )
                                    )}
                                    </SelectContent>
                                </Select>
                                </TableCell>
                                {/* 申込状態 */}
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

                                {/* 抽選結果 */}
                                <TableCell>
                                    <Select>
                                        <SelectTrigger>
                                        <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {lotteryResultList?.map((item) => (
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

                                {/* メモ */}
                                <TableCell>
                                    <Input
                                        defaultValue={entry.memo ?? ""}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button>
                                        削除
                                    </Button>
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
  );
}