import { useEffect } from "react";

export default function useTotalDamagePooling(setDamage) {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/data/total-damage.json?timestamp=" + new Date().getTime()) // força reload do JSON
        .then(res => res.json())
        .then(setDamage)
        .catch(console.error);
    }, 1000);

    return () => clearInterval(interval);
  }, [setDamage]);
}
