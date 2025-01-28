
import { useState } from 'react';
import './App.css'
import ingameMock from './mock/ingame-mock-gameRunning.json'
import bansMock from './mock/bans-mock.json'
import { useEffect } from 'react';
import banSvg from './assets/ban.svg'
const AppWithoutDamage = () => {
    const [messages, setMessages] = useState(ingameMock)
    const [bans, setBans] = useState(bansMock)

    const baseUrl = 'localhost:5000'
    function transformarSegundosEmMinutosSegundos(segundos) {
        // Calcula os minutos e segundos
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;

        // Formata para garantir dois dígitos
        const minutosFormatados = String(minutos).padStart(2, '0');
        const segundosFormatados = String(segundosRestantes).padStart(2, '0');

        // Retorna no formato mm:ss
        return `${minutosFormatados}:${segundosFormatados}`;
    }

    function formatarNumero(numero) {
        if (numero >= 1000) {
            return (numero / 1000).toFixed(1) + 'K'; // Arredonda para 1 casa decimal e adiciona "K"
        }
        return numero.toString(); // Retorna o número original se for menor que 1000
    }

    useEffect(() => {
        // Conecta ao servidor WebSocket
        const ws = new WebSocket(`ws://${baseUrl}/ws/pre`);

        ws.onopen = () => {
            console.log('Conexão WebSocket aberta');
        };

        // Evento quando uma mensagem é recebida
        ws.onmessage = (event) => {
            if (event.data != 'KeepAlive') {
                const message = JSON.parse(event.data); // Converte a mensagem para objeto

                // Verifica se a mensagem é do tipo "ingame-state-update" e se o gameStatus é "gameRunning"
                if (message.type === 'champion-select-state-update' && message.state.isActive === true) {
                    //console.log('Mensagem recebida (gameRunning):', message);

                    // Atualiza o estado com a nova mensagem
                    setBans(message);
                }
            }

        };

        // Evento quando a conexão é fechada
        ws.onclose = () => {
            console.log('Conexão WebSocket fechada');
        };

        // Evento em caso de erro
        ws.onerror = (error) => {
            console.error('Erro no WebSocket:', error);
        };

    }, []);

    const teamKDA = (team) => {
        return messages.state.scoreboardBottom.teams[team].players
            .reduce((total, player) => total + player.kills, 0) + '/' +
            messages.state.scoreboardBottom.teams[team].players
                .reduce((total, player) => total + player.deaths, 0) + '/' +
            messages.state.scoreboardBottom.teams[team].players
                .reduce((total, player) => total + player.assists, 0)
    }
    useEffect(() => {
        // Conecta ao servidor WebSocket
        const ws = new WebSocket(`ws://${baseUrl}/ws/in`);

        ws.onopen = () => {
            console.log('Conexão WebSocket aberta');
        };

        // Evento quando uma mensagem é recebida
        ws.onmessage = (event) => {
            if (event.data != 'KeepAlive') {
                const message = JSON.parse(event.data); // Converte a mensagem para objeto

                // Verifica se a mensagem é do tipo "ingame-state-update" e se o gameStatus é "gameRunning"
                if (message.type === 'ingame-state-update' && message.state.gameStatus === 'gameRunning') {
                    //console.log('Mensagem recebida (gameRunning):', message);

                    // Atualiza o estado com a nova mensagem
                    setMessages(message);

                    //console.log(messages)
                }
            }

        };

        // Evento quando a conexão é fechada
        ws.onclose = () => {
            console.log('Conexão WebSocket fechada');
        };

        // Evento em caso de erro
        ws.onerror = (error) => {
            console.error('Erro no WebSocket:', error);
        };

    }, []);

    return (
        <div className="container p-5">
            <div className='row text-center '>
                <div className='col-5 d-flex justify-content-start align-items-center'>
                    <img className='logo' src={`http://${baseUrl}/${messages?.state.scoreboard.teams[0].teamIconUrl}`} />
                    <h1>{messages?.state.scoreboard.teams[0].teamName}</h1>
                </div>
                <div className='col-2 d-flex justify-content-center align-items-center'>
                    <h2>{transformarSegundosEmMinutosSegundos(messages?.state.gameTime)}</h2>
                </div>
                <div className='col-5 d-flex justify-content-end align-items-center'>
                    <h1>{messages?.state.scoreboard.teams[1].teamName}</h1>
                    <img className='logo' src={`http://${baseUrl}/${messages?.state.scoreboard.teams[1].teamIconUrl}`} />
                </div>
            </div>
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
                                            <div className='col-2 d-flex justify-content-center'>{player.totalGold}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.creepScore}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.kills}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.assists}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.deaths}</div>
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
                                            <div className='col-2 d-flex justify-content-center'>{player.assists}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.deaths}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.creepScore}</div>
                                            <div className='col-2 d-flex justify-content-center'>{player.totalGold}</div>
                                            <div className='col-2 d-flex justify-content-start'>
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
                        <p>{teamKDA(0)}</p>
                        <p>{formatarNumero(messages?.state.scoreboard.teams[0].gold)}</p>
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
                        <p className='d-flex flex-row-reverse'>{teamKDA(1)}</p>
                        <p className='d-flex flex-row-reverse'>{formatarNumero(messages?.state.scoreboard.teams[1].gold)}</p>
                        <p className='d-flex flex-row-reverse'>{messages?.state.scoreboard.teams[1].towers}</p>
                        <p className='d-flex flex-row-reverse'>{messages?.state.scoreboard.teams[1].dragons.length}</p>
                        <p className='d-flex flex-row-reverse'>{messages?.state.scoreboard.teams[1].grubs}</p>

                    </div>
                </div>

            </div>
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

export default AppWithoutDamage;