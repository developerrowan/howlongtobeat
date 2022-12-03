require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getHowLongToBeatByTwitchGame = require('./how-long.service.js');

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

app.get('/howlong/:gameName', (req, res) => {
    const gameName = req.params.gameName;

    getHowLongToBeatByTwitchGame(gameName).then((howLong) => {
        if(howLong === false) {
            res.json({});
            return;
        }

        res.json(howLong);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;