import { useEffect } from 'react';

export function useWebSocketPre(baseUrl, setBans) {
  useEffect(() => {
    const ws = new WebSocket(`ws://${baseUrl}/ws/pre`);

    ws.onopen = () => {
      console.log('WebSocket /pre opened');
    };

    ws.onmessage = (event) => {
      if (event.data !== 'KeepAlive') {
        const message = JSON.parse(event.data);
        if (
          message.type === 'champion-select-state-update' &&
          message.state.isActive === true
        ) {
          setBans(message);
        }
      }
    };

    ws.onclose = () => console.log('WebSocket /pre closed');
    ws.onerror = (error) => console.error('WebSocket /pre error:', error);

    return () => {
      ws.close();
    };
  }, [baseUrl, setBans]);
}
