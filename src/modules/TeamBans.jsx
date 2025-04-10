import { query } from "../utils"
import banSvg from '../assets/ban.svg'
import CustomImg from "../Components/CustomImg"

const TeamBans = ({ bans }) => {
    const baseUrl = query('ws')
    return (
        <div className='flex-row align-items-center d-flex justify-content-between'>

            <div className='flex-col-5'>
                {bans?.state.blueTeam.bans.map((ban, index) => {
                    if (index > 2)
                        return ban.champion !== null
                            ? <img className='bans me-2' src={`http://${baseUrl}/${ban.champion.squareImg}`} />
                            : <img className='bans me-2' src={banSvg}></img>
                    return ban.champion !== null
                        ? <img className='bans ms-2' src={`http://${baseUrl}/${ban.champion.squareImg}`} />
                        : <img className='bans ms-2' src={banSvg}></img>
                })}

            </div>
            <div className='flex-col-2'>
                <h1>BANS</h1>
            </div>
            <div className='flex-col-5 d-flex flex-row-reverse'>
                {bans?.state.redTeam.bans.map((ban, index) => {
                    if (index > 2)
                        return ban.champion !== null
                            ? <img className='bans ms-2' src={`http://${baseUrl}/${ban.champion.squareImg}`} />
                            : <img className='bans ms-2' src={banSvg}></img>
                    return ban.champion !== null
                        ? <img className='bans me-2' src={`http://${baseUrl}/${ban.champion.squareImg}`} />
                        : <img className='bans me-2' src={banSvg}></img>
                })}
            </div>
        </div>
    )
}

export default TeamBans