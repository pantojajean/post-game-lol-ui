import { useEffect, useRef } from "react";

export default function useTotalDamagePooling(setDamage, message) {
  const postGameAreGetted = useRef(false);

  useEffect(() => {
    if (postGameAreGetted === true) return

    if (message?.state.gameStatus !== 'gameOver') return;

    fetch(`http://localhost:9721/post-game`)
      .then(res => res.json())
      .then(setDamage)
      .catch(console.error);

    postGameAreGetted.current = true;

  }, [setDamage, message]);
}
