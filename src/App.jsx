
import { useState } from 'react';
import './App.css'
import ingameMock from './mock/ingame-mock-gameRunning.json'
import bansMock from './mock/bans-mock.json'
import banSvg from './assets/ban.svg'
import { query } from './utils';
import { useWebSocketPre } from './hooks/useWebSocketPre';
import { useWebSocketIn } from './hooks/useWebSocketIn';
import { useObjectiveCount } from './hooks/useObjectiveCount'

import TeamTimeTeamHeader from './modules/TeamTimeTeamHeader';
import TeamScoreStatistics from './modules/TeamScoreStatistics';
import ObjectiveStatistics from './modules/ObjectiveStatistics';
const App = () => {
    const [messages, setMessages] = useState(ingameMock)
    const [bans, setBans] = useState(bansMock)

    const [baronsCount, setBaronsCount] = useState([0, 0])
    const [atakhanCount, setAtakhanCount] = useState(['', ''])


    const baseUrl = query('ws')

    useWebSocketIn(baseUrl, setMessages)
    useWebSocketPre(baseUrl, setBans)
    useObjectiveCount(messages, setBaronsCount, setAtakhanCount)

    return (
        <div className="container p-5">
            <TeamTimeTeamHeader state={messages?.state} />
            <div className='row'>
                <div className='col ps-5 pt-5 team'>
                    <TeamScoreStatistics state={messages?.state} />
                </div>

                <div className='col pe-5 pt-5 row'>

                    <ObjectiveStatistics state={messages?.state} barons={baronsCount} atakhans={atakhanCount} />
                </div>

            </div>
            <br></br>
            <br></br>

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
                    <h1>Bans</h1>
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
        </div>
    );
};

export default App;