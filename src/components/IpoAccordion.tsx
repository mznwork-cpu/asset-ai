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
        //画面行追加
        const handleAddEntry = (
            ipoId: string
        ) => {
            const currentEntries =
                entryStateMap[ipoId] ?? [];
            const newEntry = {
                ipo_entry_id: crypto.randomUUID(),
                security_company_name: "",
                applied_shares: 100,
                entry_status_code: 1,
                entry_status_name: "未申込",
                lottery_result_code: 1,
                lottery_result_name: "結果待ち",
                memo: "",
            };
            setEntryStateMap({
            ...entryStateMap,
            [ipoId]:[...currentEntries,
                newEntry,
            ],
            });
        };
        /**
         * 編集値変更
         * InputやSelect変更時にentryStateMapを更新する
         */
        const handleEntryChange = (
            ipoId: string,
            rowIndex: number,
            field: string,
            value: any
            ) => {
            // 編集対象IPOの行一覧取得
            const currentEntries =
                entryStateMap[ipoId] ?? [];
            // 配列コピー
            const updatedEntries = [
                ...currentEntries,
            ];
            // 対象行更新
            updatedEntries[rowIndex] = {
                ...updatedEntries[rowIndex],
                // 今回変更された項目だけ更新
                [field]: value,
            };

            // state更新
            setEntryStateMap({
                ...entryStateMap,
                [ipoId]:updatedEntries,
            });
        };
        // Accodion表示
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
                            {entries.map(
                                (
                                    entry: any,
                                    index: number
                                ) => (
                            <TableRow
                                key={entry.ipo_entry_id}
                            >
                                {/* 証券会社名 */}
                                <TableCell>
                                   <Select
                                        // 画面表示
                                        value={
                                            entry.security_company_name
                                        }
                                        // 証券会社変更
                                        onValueChange={(value) => {
                                            // 選択された証券会社取得
                                            const selectedCompany =
                                                securitiesCompanies.find(
                                                    (company) =>
                                                        company.security_company_id.toString() ===value
                                                );
                                            // 対象IPOの現在行取得
                                            const currentEntries = entryStateMap[ipo.ipo_id] ?? [];
                                            // 編集用配列コピー
                                            const updatedEntries = [
                                                ...currentEntries,
                                            ]
                                            // 対象行更新
                                            updatedEntries[index] = {
                                                ...updatedEntries[index],
                                                // DB保存用ID
                                                security_company_id: value,
                                                // 画面表示用名称
                                                security_company_name:
                                                    selectedCompany?.security_company_name ?? "",
                                            };
                                        // State更新
                                        setEntryStateMap({
                                            ...entryStateMap,
                                            [ipo.ipo_id]: updatedEntries,
                                        });
                                        }}
                                     >
                                    <SelectTrigger>
                                    
                                        {/* 画面表示は名称 */}
                                        <SelectValue 
                                            placeholder='証券会社'
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {securitiesCompanies?.map(
                                            (company) => (
                                                <SelectItem
                                                    key={company.security_company_id}
                                                    value={company.security_company_id.toString()}
                                                >
                                                {company.security_company_name}
                                            </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                </TableCell>
                                
                                {/* 申込枚数 */}
                                <TableCell> 
                                    <Input
                                    value={
                                        entry.applied_shares ?? ""
                                    }
                                    /** 入力変更時 */
                                    onChange={(e) =>
                                        handleEntryChange(
                                        ipo.ipo_id,
                                        index,
                                        "applied_shares",
                                        e.target.value
                                        )
                                    }
                                    />
                                </TableCell>
                                {/* 申込状態 */}
                                <TableCell>
                                    <Select
                                        value={entry.entry_status_name ?? ""}
                                        onValueChange={(value) => {
                                            const selectedStatus = entryStatusList.find(
                                                (item) => item.code === value
                                            );
                                            const currentEntries =
                                                entryStateMap[ipo.ipo_id] ?? [];
                                            const updatedEntries = [...currentEntries];

                                            updatedEntries[index] = {
                                                ...updatedEntries[index],
                                                entry_status_code: value,
                                                entry_status_name:
                                                    selectedStatus?.code_name ?? "",
                                            };

                                            setEntryStateMap({
                                                ...entryStateMap,
                                                [ipo.ipo_id]: updatedEntries,
                                            });
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="申込状態" />
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
                                    <Select
                                        value={entry.lottery_result_name ?? ""}
                                        onValueChange={(value) => {
                                            const selectedResult = lotteryResultList.find(
                                                (item) => item.code === value
                                            );
                                            const currentEntries =
                                                entryStateMap[ipo.ipo_id] ?? [];
                                            const updatedEntries = [...currentEntries];

                                            updatedEntries[index] = {
                                                ...updatedEntries[index],
                                                lottery_result_code: value,
                                                lottery_result_name:
                                                    selectedResult?.code_name ?? "",
                                            };

                                            setEntryStateMap({
                                                ...entryStateMap,
                                                [ipo.ipo_id]: updatedEntries,
                                            });
                                        }}
                                    >
                                        <SelectTrigger>
                                        <SelectValue placeholder="抽選結果" />
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
