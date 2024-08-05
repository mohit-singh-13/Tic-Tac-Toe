import { useEffect, useState } from "react";

const useSocket = () => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(URL);

        ws.onopen = () => {
            console.log("connected");
            setSocket(ws);
        }

        ws.onclose = () => {
            console.log("disconnected");
            setSocket(null);
        }

        return () => {
            ws.close();
        }
    }, [URL])

    return socket;
}

export default useSocket