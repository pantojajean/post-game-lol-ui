import CustomImg from '../Components/CustomImg'
import { formatNumber, getMaxTotalDamage, query } from '../utils'

const TeamTotalDamage = ({ state, totalDamage }) => {
    const baseUrl = query('ws');
    const maxValue = getMaxTotalDamage(totalDamage)
    return (
        <div className='flex-row align-items-center d-flex'>
            <div className="col team ">
                <div className='flex-row d-flex align-items-center justify-content-end'>
                    <div className='col d-flex justify-content-start'></div>
                </div>
                {
                    state.scoreboardBottom.teams[0].players.map((player, index) => {
                        return (
                            <div className='flex-row mb-1 d-flex align-items-center justify-content-end'>
                                <div className='col-2 d-flex justify-content-start'>
                                    <CustomImg src={`http://${baseUrl}/${player.champion.squareImg}`} />
                                </div>
                                <div className='col-2 d-flex justify-content-start'>{formatNumber(totalDamage.teams[0].players[index])}</div>
                               
                                <div className="col-8  d-flex flex-row">
                                    <div className="bar blue" style={{ width: `${(totalDamage.teams[0].players[index]/maxValue)*90}%` }}>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="col team ">
                <div className='flex-row d-flex align-items-center justify-content-end'>
                    <div className='col d-flex justify-content-start'></div>

                </div>
                {
                    state.scoreboardBottom.teams[1].players.map((player, index) => {
                        return (
                            <div className='flex-row mb-1 d-flex align-items-center justify-content-end'>
                                <div className="col-8  d-flex flex-row-reverse">
                                    <div className="bar red" style={{ width: `${(totalDamage.teams[1].players[index]/maxValue)*90}%` }}>
                                    </div>
                                </div>
                                <div className='col-2 d-flex justify-content-end'>{formatNumber(totalDamage.teams[1].players[index])}</div>
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

export default TeamTotalDamage