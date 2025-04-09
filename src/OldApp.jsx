
import { useState } from 'react';
import './App.css'
import ingameMock from './mock/ingame-mock-gameRunning.json'
import bansMock from './mock/bans-mock.json'
import { useEffect } from 'react';
const OldApp = () => {
    const [messages, setMessages] = useState(ingameMock)
    const [bans, setBans] = useState(bansMock)
    const baseUrl = 'localhost:58869'
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

   

    useEffect(() => {
        // Conecta ao servidor WebSocket
        const ws = new WebSocket(`ws://${baseUrl}/ws/in`);

        ws.onopen = () => {
            console.log('Conexão WebSocket aberta');
        };

        // Evento quando uma mensagem é recebida
        ws.onmessage = (event) => {
            console.log(event)
            if (event.data != 'KeepAlive') {
                const message = JSON.parse(event.data); // Converte a mensagem para objeto

                // Verifica se a mensagem é do tipo "ingame-state-update" e se o gameStatus é "gameRunning"
                if (message.type === 'ingame-state-update' && message.state.gameStatus === 'gameRunning') {
                    setMessages(message);

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

                                <div className='col-2 d-flex justify-content-start'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                                <div className='col-2 d-flex justify-content-center'>42.3K</div>

                                <div className="col-8  d-flex">
                                    <div className="bar blue" style={{ width: '42.3%' }}>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-row d-flex align-items-center justify-content-end'>

                                <div className='col-2 d-flex justify-content-start'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                                <div className='col-2 d-flex justify-content-center'>22.0K</div>

                                <div className="col-8 d-flex">
                                    <div className="bar blue" style={{ width: '22.0%' }}>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-row d-flex align-items-center justify-content-end'>
                                <div className='col-2 d-flex justify-content-start'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                                <div className='col-2 d-flex justify-content-center'>20.6K</div>

                                <div className="col-8  d-flex">
                                    <div className="bar blue" style={{ width: '20.6%' }}>
                                    </div>
                                </div>

                            </div>
                            <div className='flex-row d-flex align-items-center justify-content-end'>
                                <div className='col-2 d-flex justify-content-start'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                                <div className='col-2 d-flex justify-content-center'>13.9K</div>

                                <div className="col-8  d-flex">
                                    <div className="bar blue" style={{ width: '13.9%' }}>
                                    </div>
                                </div>

                            </div>
                            <div className='flex-row d-flex align-items-center d-flex justify-content-end'>

                                <div className='col-2 d-flex justify-content-start'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                                <div className='col-2 d-flex justify-content-center'>5.0K</div>

                                <div className="col-8 d-flex">
                                    <div className="bar blue" style={{ width: '5%' }}>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col team divider-left">
                            <div className='flex-row d-flex align-items-center justify-content-end'>
                                <div className="col-8  d-flex flex-row-reverse">
                                    <div className="bar red" style={{ width: '42.3%' }}>
                                    </div>
                                </div>
                                <div className='col-2 d-flex justify-content-center'>42.3K</div>
                                <div className='col-2 d-flex justify-content-end'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                            </div>
                            <div className='flex-row d-flex align-items-center justify-content-end'>
                                <div className="col-8 d-flex flex-row-reverse">
                                    <div className="bar red" style={{ width: '22.0%' }}>
                                    </div>
                                </div>
                                <div className='col-2 d-flex justify-content-center'>22.0K</div>
                                <div className='col-2 d-flex justify-content-end'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                            </div>
                            <div className='flex-row d-flex align-items-center justify-content-end'>
                                <div className="col-8  d-flex flex-row-reverse">
                                    <div className="bar red" style={{ width: '20.6%' }}>
                                    </div>
                                </div>
                                <div className='col-2 d-flex justify-content-center'>20.6K</div>
                                <div className='col-2 d-flex justify-content-end'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                            </div>
                            <div className='flex-row d-flex align-items-center justify-content-end'>
                                <div className="col-8  d-flex flex-row-reverse">
                                    <div className="bar red" style={{ width: '13.9%' }}>
                                    </div>
                                </div>
                                <div className='col-2 d-flex justify-content-center'>13.9K</div>
                                <div className='col-2 d-flex justify-content-end'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                            </div>
                            <div className='flex-row d-flex align-items-center d-flex justify-content-end'>
                                <div className="col-8 d-flex flex-row-reverse">
                                    <div className="bar red" style={{ width: '5%' }}>
                                    </div>
                                </div>
                                <div className='col-2 d-flex justify-content-center'>5.0K</div>
                                <div className='col-2 d-flex justify-content-end'>
                                    <img src='http://localhost:5000/cache/teams/1/icon.png' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex-row align-items-center d-flex justify-content-between'>
                        <div className='flex-col-5'>
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />

                        </div>
                        <div className='flex-col-2'>
                            Bans
                        </div>
                        <div className='flex-col-5 d-flex flex-row-reverse'>
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />
                            <img src='http://localhost:5000/cache/teams/1/icon.png' />
                        </div>
                    </div>
                </div>
                <div className='col pe-5 pt-5 row'>
                    <div className="col team">
                        <p>16/11/40</p>
                        <p>70.3K</p>
                        <p>10</p>
                        <p>3</p>
                        <p>0</p>
                        <p>1</p>
                    </div>
                    <div className="col text-center">
                        <p>KDA</p>
                        <p>Ouro</p>
                        <p>Torres</p>
                        <p>Dragões</p>
                        <p>Dragão Ancião</p>
                        <p>Barão</p>
                    </div>
                    <div className="col team">
                        <p className='d-flex flex-row-reverse'>11/16/25</p>
                        <p className='d-flex flex-row-reverse'>63.4K</p>
                        <p className='d-flex flex-row-reverse'>3</p>
                        <p className='d-flex flex-row-reverse'>3</p>
                        <p className='d-flex flex-row-reverse'>0</p>
                        <p className='d-flex flex-row-reverse'>1</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OldApp;