import { useEffect, useState } from "react";

type ChatType = {
  roomId: string,
  message: string,
};

const useWebSocket = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new WebSocket(`ws://myoungpumgwan.store/api/v1/chat/ws/${localStorage.getItem('user_id')}`);
    socket.onopen = () => {
      // console.log('Connected to WebSocket server');
      setIsConnected(true);
    }
    socket.onmessage = (event) => {
      const newMessage = event.data;
      if (!messages.includes(newMessage)) {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      }
    };
    socket.onclose = () => {
      // console.log('Disconnected from WebSocket server');
    };
    socket.onerror = (error) => {
      console.error('WebSocket error', error);
    };
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = ({ roomId, message }: ChatType) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ room_id: roomId, user_id: Number(localStorage.getItem('user_id')), message: message }));
    }
  };

  return { messages, isConnected, sendMessage, setUserId };
}

export default useWebSocket