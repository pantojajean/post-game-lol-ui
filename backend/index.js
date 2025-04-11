
const LockfileParser = require('lol-lockfile-parser');
const config = require('./config.json')
const lockfile = new LockfileParser();

const path = require('path');
const express = require('express')
const axios = require('axios');
const https = require('https');
const cors = require('cors');

const app = express()
const port = 9721
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.get('/post-game/', async (req, res) => {
    //const gameId = req.params.id;
    let data;

    try { data = await lockfile.read(config.client_path + '\\lockfile'); }
    catch (err) { es.status(400).json({ error: 'Falha ao ler lockfile' }); }

    const { port, password, protocol } = data;

    const basicAuth = Buffer.from(`riot:${password}`).toString('base64');

    try {
        const response = await axios.get(
            `${protocol}://127.0.0.1:${port}/lol-end-of-game/v1/eog-stats-block`,
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


        let blueside = new Array(5).fill(0);
        let redside = new Array(5).fill(0);

        response.data.teams[0].players.forEach((element, _index) => {
            blueside[_index] = element.stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS
        });

        response.data.teams[1].players.forEach((element, _index) => {
            redside[_index] = element.stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS
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