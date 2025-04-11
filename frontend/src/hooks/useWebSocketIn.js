import { useEffect } from 'react';

export function useWebSocketIn(baseUrl, setMessages) {
  useEffect(() => {
    const ws = new WebSocket(`ws://${baseUrl}/ws/in`);
    ws.onopen = () => {
      console.log('WebSocket /in opened');
    };

    ws.onmessage = (event) => {
      if (event.data !== 'KeepAlive') {
        const message = JSON.parse(event.data);
        if (
          message.type === 'ingame-state-update' &&
          message.state.gameStatus === 'gameRunning'
        ) {
          setMessages(message);
        }
      }
    };

    ws.onclose = () => console.log('WebSocket /in closed');
    ws.onerror = (error) => console.error('WebSocket /in error:', error);

    return () => {
      ws.close();
    };
  }, [baseUrl, setMessages]);
}
