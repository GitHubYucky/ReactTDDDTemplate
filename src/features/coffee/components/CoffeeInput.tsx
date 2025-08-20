// src/features/coffee/components/CoffeeInput.tsx
import { useState } from "react";
import { Button } from "../../../components/button/button";
import { Input } from "@/components/input/input";

type Props = {
  onSearch: (type: string, title: string) => void;
  disabled?: boolean;
};

export const CoffeeInput = ({ onSearch, disabled = false }: Props) => {
  const [type, setType] = useState<"hot" | "iced">("hot");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(type, title.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="coffee-search"
      className="flex flex-col sm:flex-row gap-3 items-stretch mb-4"
    >
      {/* Type: 幅と高さを拡大 */}
      <div className="w-full sm:w-64">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "hot" | "iced")}
          aria-label="coffee-type"
          disabled={disabled}
          className="w-full h-11 px-3 text-base border border-slate-300 rounded
                     bg-white disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          <option value="hot">hot</option>
          <option value="iced">iced</option>
        </select>
      </div>

      {/* Title: 高さを合わせる */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Title
        </label>
        <Input
          type="text"
          placeholder="Search CoffeeTitle..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="coffee-title"
          disabled={disabled}
        />
      </div>

      {/* Searchボタン: 高さを合わせる */}
      <Button type="submit" disabled={disabled}>
        Search
      </Button>
    </form>
  );
};
