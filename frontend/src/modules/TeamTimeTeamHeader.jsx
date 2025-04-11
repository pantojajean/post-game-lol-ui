import { convertSecondsToMinutesSeconds } from '../utils'
import { query } from '../utils'
import CustomImg from '../Components/CustomImg'
const TeamTimeTeamHeader = ({ state }) => {
    const baseUrl = query('ws');

    return (
        <div className='row text-center '>
            <div className='col-5 d-flex justify-content-start align-items-center'>
                <CustomImg src={`http://${baseUrl}/${state.scoreboard.teams[0].teamIconUrl}`} />
                <h1>{state.scoreboard.teams[0].teamName}</h1>
            </div>
            <div className='col-2 d-flex justify-content-center align-items-center'>
                <h2>{convertSecondsToMinutesSeconds(state.gameTime)}</h2>
            </div>
            <div className='col-5 d-flex justify-content-end align-items-center'>
                <h1>{state.scoreboard.teams[1].teamName}</h1>
                <CustomImg src={`http://${baseUrl}/${state.scoreboard.teams[1].teamIconUrl}`} />

            </div>
        </div>
    )
}

export default TeamTimeTeamHeader