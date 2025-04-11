import { useEffect, useRef } from "react";

export default function useTotalDamagePooling(setDamage) {
  const previousGameIdRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/data/match-id.json?timestamp=" + new Date().getTime())
        .then(res => res.json())
        .then((matchData) => {
          const matchId = matchData.id;

          if (matchId !== previousGameIdRef.current) {
            previousGameIdRef.current = matchId;

            if (matchId) {
              fetch(`http://localhost:9721/post-game`)
                .then(res => res.json())
                .then(setDamage)
                .catch(console.error);
            }
          }
        })
        .catch(console.error);
    }, 1000);

    return () => clearInterval(interval);
  }, [setDamage]);
}
