import { Weather } from "../types/weather";
import styles from "./WeatherDisplay.module.css";

type Props = {
  weather: Weather | null;
  error: Error | null;
};

export const WeatherDisplay = ({ weather, error }: Props) => {
  if (error) {
    return (
      <div className={`${styles.message} ${styles.errorMessage}`}>
        Error!
      </div>
    );
  }

  if (!weather) {
    return (
      <div className={`${styles.message} ${styles.noInfoMessage}`}>
        NoWeatherInfo
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>現在の天気</h2>
      <div className={styles.info}>
        <p>気温: {weather.temperature}℃</p>
        <p>風速: {weather.windspeed} m/s</p>
        <p>風向: {weather.winddirection}°</p>
        <p>天気コード: {weather.weathercode}</p>
        <p>昼夜: {weather.is_day === 1 ? "昼" : "夜"}</p>
        <p>時間: {weather.time}</p>
      </div>
    </div>
  );
};
