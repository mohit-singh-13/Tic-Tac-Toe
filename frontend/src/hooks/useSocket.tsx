import { useEffect, useState } from "react";

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  useEffect(() => {
    const URI = import.meta.env.VITE_BE_URI as string;
    const ws = new WebSocket(URI);

    ws.onopen = () => {
      console.log("Connected");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};

export default useSocket;
