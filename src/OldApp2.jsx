
import { useState } from 'react';
import './App.css'
import ingameMock from './mock/ingame-mock-gameRunning.json'
import bansMock from './mock/bans-mock.json'
import banSvg from './assets/ban.svg'
import { convertSecondsToMinutesSeconds, formatNumber, teamKDA, query } from './utils';
import { useWebSocketPre } from './hooks/useWebSocketPre';
import { useWebSocketIn } from './hooks/useWebSocketIn';
import TeamTimeTeamHeader from './modules/TeamTimeTeamHeader';

const App = () => {
    const [messages, setMessages] = useState(ingameMock)
    const [bans, setBans] = useState(bansMock)

    const baseUrl = query('ws')

    useWebSocketIn(baseUrl, setMessages)
    useWebSocketPre(baseUrl, setBans)

    return (
        <div className="container p-5">
            {/* 
            
            <div className='row text-center '>
                <div className='col-5 d-flex justify-content-start align-items-center'>

                    {messages?.state.scoreboard.teams[0].teamIconUrl == ''
                        ? <></>
                        : <img className='logo' src={`http://${baseUrl}/${messages?.state.scoreboard.teams[0].teamIconUrl}`} />}
                    <h1>{messages?.state.scoreboard.teams[0].teamName}</h1>
                </div>
                <div className='col-2 d-flex justify-content-center align-items-center'>
                    <h2>{convertSecondsToMinutesSeconds(messages?.state.gameTime)}</h2>
                </div>
                <div className='col-5 d-flex justify-content-end align-items-center'>
                    <h1>{messages?.state.scoreboard.teams[1].teamName}</h1>
                    {messages?.state.scoreboard.teams[1].teamIconUrl == ''
                        ? <></>
                        : <img className='logo' src={`http://${baseUrl}/${messages?.state.scoreboard.teams[1].teamIconUrl}`} />}
                </div>
            </div>
            */}

            <TeamTimeTeamHeader state={messages?.state}/>
            <div className='row'>
                <div className='col ps-5 pt-5 team'>
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
                                messages?.state.scoreboardBottom.teams[0].players.map(player => {

                                    return (
                                        <div className='flex-row mb-1 d-flex align-items-center justify-content-end'>
                                            <div className='col-2 d-flex justify-content-start'>
                                                <img src={`http://${baseUrl}/${player.champion.squareImg}`} />
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
                                messages?.state.scoreboardBottom.teams[1].players.map(player => {
                                    return (
                                        <div className='flex-row mb-1 d-flex align-items-center justify-content-end'>
                                            <div className='col-2 d-flex justify-content-center'>{player.kills}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.deaths}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.assists}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.creepScore}</div>
                                            <div className='col-2 d-flex justify-content-center'>{formatNumber(player.totalGold)}</div>
                                            <div className='col-2 d-flex justify-content-end'>
                                                <img src={`http://${baseUrl}/${player.champion.squareImg}`} />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>


                </div>
                <div className='col pe-5 pt-5 row'>

                    <div className="col team">
                        <br></br>
                        <p>{teamKDA(0, messages)}</p>
                        <p>{formatNumber(messages?.state.scoreboard.teams[0].gold)}</p>
                        <p>{messages?.state.scoreboard.teams[0].towers}</p>
                        <p>{messages?.state.scoreboard.teams[0].dragons.length}</p>
                        <p>{messages?.state.scoreboard.teams[0].grubs}</p>
                    </div>
                    <div className="col text-center">
                        <br></br>
                        <p>KDA</p>
                        <p>Ouro</p>
                        <p>Torres</p>
                        <p>Dragões</p>
                        <p>Vastilarvas</p>
                    </div>
                    <div className="col team">
                        <br></br>
                        <p className='d-flex flex-row-reverse'>{teamKDA(1, messages)}</p>
                        <p className='d-flex flex-row-reverse'>{formatNumber(messages?.state.scoreboard.teams[1].gold)}</p>
                        <p className='d-flex flex-row-reverse'>{messages?.state.scoreboard.teams[1].towers}</p>
                        <p className='d-flex flex-row-reverse'>{messages?.state.scoreboard.teams[1].dragons.length}</p>
                        <p className='d-flex flex-row-reverse'>{messages?.state.scoreboard.teams[1].grubs}</p>

                    </div>
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