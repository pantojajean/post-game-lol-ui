import { useEffect, useRef } from "react";

export function useObjectiveCount(messages, setBaronsCount, setAtakhanCount) {
    const baronActive = useRef(false);
    const atakhanActive = useRef(false);

    useEffect(() => {
        if (messages?.state.gameStatus === 'gameRunning') {
            const teams = messages?.state.scoreboard.teams;

            let baronTeamIndex = null;
            if (teams[0].baronPowerPlay !== null) baronTeamIndex = 0;
            else if (teams[1].baronPowerPlay !== null) baronTeamIndex = 1;

            if (baronTeamIndex !== null && !baronActive.current) {
                setBaronsCount(prev => {
                    const updated = [...prev];
                    updated[baronTeamIndex] += 1;
                    return updated;
                });
                baronActive.current = true;
            } else if (baronTeamIndex === null) {
                baronActive.current = false;
            }

            let atakhanTeamIndex = null;
            if (teams[0].atakhan !== null) atakhanTeamIndex = 0;
            else if (teams[1].atakhan !== null) atakhanTeamIndex = 1;

            if (atakhanTeamIndex !== null && !atakhanActive.current) {
                setAtakhanCount(prev => {
                    const updated = [...prev];
                    updated[atakhanTeamIndex] = teams[atakhanTeamIndex].atakhan;
                    return updated;
                });
                atakhanActive.current = true;
            } else if (atakhanTeamIndex === null) {
                atakhanActive.current = false;
            }
        }
    }, [messages, setBaronsCount, setAtakhanCount]);
}