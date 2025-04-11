
const LockfileParser = require('lol-lockfile-parser');
const config = require('./config.json')
const lockfile = new LockfileParser();

const path = require('path');
const express = require('express')
const axios = require('axios');
const https = require('https');

const app = express()
const port = 9721

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html')) ;
});

app.get('/post-game/:id', async (req, res) => {
    const gameId = req.params.id;
    let data;

    try { data = await lockfile.read(config.client_path + '\\lockfile'); }
    catch (err) { es.status(400).json({ error: 'Falha ao ler lockfile' }); }

    const { port, password, protocol } = data;

    const basicAuth = Buffer.from(`riot:${password}`).toString('base64');

    try {
        const response = await axios.get(
            `${protocol}://127.0.0.1:${port}/lol-match-history/v1/games/${gameId}`,
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false // IGNORA certificado SSL inválido
                })
            }
        );

        //res.json(response.data)


        let blueside = []
        let redside = []

        response.data.participants.forEach(element => {
            if (element.teamId === 100) blueside[element.participantId - 1] = element.stats.totalDamageDealtToChampions
            if (element.teamId === 200) redside[element.participantId - 6] = element.stats.totalDamageDealtToChampions

        });

        const matchData = {
            teams: [
                { players: blueside },
                { players: redside }
            ]
        }

        res.json(matchData)

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar partida', details: err.message });
    }
})

app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
})