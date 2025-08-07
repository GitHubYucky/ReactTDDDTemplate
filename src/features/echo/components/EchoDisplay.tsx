type Props = {
    echo: string;
    loading: boolean;
    error: string;
  };

  export const EchoDisplay = ({ echo, loading, error }: Props) => {
    if (loading) return <p>送信中...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!echo) return null;

    return <p>{echo}</p>;
  };
