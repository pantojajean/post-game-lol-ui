import CustomImg from '../Components/CustomImg'
import { formatNumber, query } from '../utils'


const TeamScoreStatistics = ({ state }) => {
    const baseUrl = query('ws');

    return (
        <div className='flex-row align-items-center d-flex'>
            <div className="col team divider-right">
                <div className='flex-row d-flex align-items-center justify-content-end'>
                    <div className='col-2 d-flex justify-content-start'></div>
                    <div className='col-2 d-flex justify-content-center'><strong>Gold</strong></div>
                    <div className='col-2 d-flex justify-content-center'><strong>CS</strong></div>
                    <div className='col-2 d-flex justify-content-center'><strong>K</strong></div>
                    <div className='col-2 d-flex justify-content-center'><strong>D</strong></div>
                    <div className='col-2 d-flex justify-content-center'><strong>A</strong></div>
                </div>
                {
                    state.scoreboardBottom.teams[0].players.map(player => {
                        return (
                            <div className='flex-row mb-1 d-flex align-items-center justify-content-end'>
                                <div className='col-2 d-flex justify-content-start'>
                                    <CustomImg src={`http://${baseUrl}/${player.champion.squareImg}`} />
                                </div>
                                <div className='col-2 d-flex justify-content-center'>{formatNumber(player.totalGold)}</div>
                                <div className='col-2 d-flex justify-content-center'>{player.creepScore}</div>
                                <div className='col-2 d-flex justify-content-center'>{player.kills}</div>
                                <div className='col-2 d-flex justify-content-center'>{player.deaths}</div>
                                <div className='col-2 d-flex justify-content-center'>{player.assists}</div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="col team divider-left">
                <div className='flex-row d-flex align-items-center justify-content-end'>
                    <div className='col-2 d-flex justify-content-center'><strong>K</strong></div>
                    <div className='col-2 d-flex justify-content-center'><strong>D</strong></div>
                    <div className='col-2 d-flex justify-content-center'><strong>A</strong></div>
                    <div className='col-2 d-flex justify-content-center'><strong>CS</strong></div>
                    <div className='col-2 d-flex justify-content-center'><strong>Gold</strong></div>
                    <div className='col-2 d-flex justify-content-start'></div>
                </div>
                {
                    state.scoreboardBottom.teams[1].players.map(player => {
                        return (
                            <div className='flex-row mb-1 d-flex align-items-center justify-content-end'>
                                <div className='col-2 d-flex justify-content-center'>{player.kills}</div>
                                <div className='col-2 d-flex justify-content-center'>{player.deaths}</div>
                                <div className='col-2 d-flex justify-content-center'>{player.assists}</div>
                                <div className='col-2 d-flex justify-content-center'>{player.creepScore}</div>
                                <div className='col-2 d-flex justify-content-center'>{formatNumber(player.totalGold)}</div>
                                <div className='col-2 d-flex justify-content-end'>
                                    <CustomImg src={`http://${baseUrl}/${player.champion.squareImg}`} />
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default TeamScoreStatistics