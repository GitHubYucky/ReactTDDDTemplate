import { useWeather } from "../hooks/useWeatherHook";
import { WeatherPlaceInput } from "./WeatherPlaceInput";
import { WeatherDisplay } from "./WeatherDisplay";

export const WeatherContainer = () => {
  const { weather, fetchWeather,loading,error } = useWeather();

  return (
    <div>
      <h1>天気検索</h1>
      <WeatherPlaceInput onSearch={fetchWeather} loading={loading} />
      <WeatherDisplay weather={weather}  error={error}/>
    </div>
  );
};
