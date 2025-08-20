// src/features/weather/components/WeatherPlaceInput.tsx
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { useState } from "react";

type Props = {
  onSearch: (lat: number, lon: number) => void;
  loading:boolean
};

export const WeatherPlaceInput = ({ onSearch,loading }: Props) => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);
    onSearch(latNum, lonNum);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          緯度:
          <Input
            type="text"
            placeholder="例: 35.0"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            disabled={loading}
          />
        </label>
      </div>
      <div>
        <label>
          経度:
          <Input
            type="text"
            placeholder="例: 135.0"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            disabled={loading}
          />
        </label>
      </div>
      <Button type="submit" disabled={loading}>天気を取得</Button>
    </form>
  );
};
