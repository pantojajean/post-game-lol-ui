
import { useState } from 'react';
import './App.css'
import totalDamage from '../public/data/total-damage.json'
import ingameMock from './mock/ingame-mock-gameRunning.json'
import bansMock from './mock/bans-mock.json'
import { query } from './utils';
import { useWebSocketPre } from './hooks/useWebSocketPre';
import { useWebSocketIn } from './hooks/useWebSocketIn';
import { useObjectiveCount } from './hooks/useObjectiveCount'

import TeamTimeTeamHeader from './modules/TeamTimeTeamHeader';
import TeamScoreStatistics from './modules/TeamScoreStatistics';
import TeamTotalDamage from './modules/TeamTotalDamage'
import ObjectiveStatistics from './modules/ObjectiveStatistics';
import useTotalDamagePooling from './hooks/useTotalDamagePooling';
import TeamBans from './modules/TeamBans';
const App = () => {
    const [messages, setMessages] = useState(ingameMock)
    const [damage, setDamage] = useState(totalDamage)
    const [bans, setBans] = useState(bansMock)

    const [baronsCount, setBaronsCount] = useState([0, 0])
    const [atakhanCount, setAtakhanCount] = useState(['', ''])

    const baseUrl = query('ws')
    useWebSocketIn(baseUrl, setMessages)
    useWebSocketPre(baseUrl, setBans)
    useTotalDamagePooling(setDamage)
    useObjectiveCount(messages, setBaronsCount, setAtakhanCount)

    return (
        <div className="container p-5">
            <TeamTimeTeamHeader state={messages?.state} />

            <div className='row'>
                <div className='col ps-5 pt-5 team'>
                    <br></br>
                    <TeamTotalDamage state={messages?.state} totalDamage={damage} />
                </div>

                <div className='col pe-5 pt-5 row'>

                    <ObjectiveStatistics state={messages?.state} barons={baronsCount} atakhans={atakhanCount} />

                    <TeamBans bans={bans} />
                </div>

            </div>

        </div>
    );
};

export default App;