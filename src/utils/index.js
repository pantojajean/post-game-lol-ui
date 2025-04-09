export function convertSecondsToMinutesSeconds(seconds) {
    seconds = Math.round(seconds);
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format to ensure two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Return in mm:ss format
    return `${formattedMinutes}:${formattedSeconds}`;
}

export function formatNumber(number) {
    number.toFixed(1)

    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K'; // Round to 1 decimal and add "K"
    }
    return number.toString(); // Return the original number if less than 1000
}

export function teamKDA(team, state) {
    return state.scoreboardBottom.teams[team].players
        .reduce((total, player) => total + player.kills, 0) + '/' +
        state.scoreboardBottom.teams[team].players
            .reduce((total, player) => total + player.deaths, 0) + '/' +
        state.scoreboardBottom.teams[team].players
            .reduce((total, player) => total + player.assists, 0)
}

export function query(key){
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key)
}

export function getDragonsUrlImgs(drake){
    return `/cache/style/ingame/objectives/dragonpit/${drake}.png`
}