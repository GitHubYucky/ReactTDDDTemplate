import { useState } from "react";

export const useEcho = () => {
  const [echo, setEcho] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const returnEcho = async (message: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/echo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("API responded with an error");
      }

      const data = await res.json();
      setEcho(data.echoed ?? "");
    } catch (err) {
      setError("通信エラー");
      setEcho("");
    } finally {
      setLoading(false);
    }
  };

  return {
    echo,
    loading,
    error,
    returnEcho
  };
};
