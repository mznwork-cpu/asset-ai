"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { importIpoCsv } from "@/services/ipo-import.service";

// CSV取込画面
export default function CsvImportPage() {

  // 選択ファイル
  const [file, setFile] =
    useState<File | null>(null);

  // CSV取込
  const handleImport = async () => {

    if (!file) {
      alert("CSVファイルを選択してください");
      return;
    }

    // CSV読込(SJIS)
    const buffer =
      await file.arrayBuffer();
    const csvText =
      new TextDecoder("shift-jis")
        .decode(buffer);

    // CSVのままconsole表示
    console.log(csvText);

    /**
     * 行分割
     */
    const lines = csvText
      .split("\r\n")
      .filter(line => line.trim() !== "");

    /**
     * ヘッダ取得
     */
    const headers =
      lines[0].split(",");

    /**
     * データ部
     */
    const rows = lines
      .slice(1)
      .map((line) => {

        const values =
          line.split(",");

        const row: Record<string, string> = {};

        headers.forEach(
          (header, index) => {

            row[header] =
              values[index] ?? "";

          }
        );

        return row;
      });

    // jsonでconsole表示
    console.log(rows);
    
    // CSVと取込み
    await importIpoCsv(rows);

    alert("取込完了");
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        CSV取込
      </h1>

      <div className="space-y-2">

        <Input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ?? null
            )
          }
        />

        {file && (
          <div>
            選択ファイル：
            {file.name}
          </div>
        )}

      </div>

      <Button
        onClick={handleImport}
      >
        取込
      </Button>
    </div>
  );
}