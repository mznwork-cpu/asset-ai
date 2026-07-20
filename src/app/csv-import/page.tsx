"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * CSV取込画面
 */
export default function CsvImportPage() {

  /**
   * 選択ファイル
   */
  const [file, setFile] =
    useState<File | null>(null);

  /**
   * CSV取込
   */
  const handleImport = async () => {

    if (!file) {
      alert("CSVファイルを選択してください");
      return;
    }

    console.log(file);

    alert("ファイル取得成功");
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