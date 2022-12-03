const hltb = require('howlongtobeat');

const getHowLongToBeatByTwitchGame = (game) => {
    const hltbService = new hltb.HowLongToBeatService();

    return new Promise((resolve, reject) => {
        hltbService.search(game)
            .then(result => {
                if (result === null || result.length === 0 || JSON.stringify(result) === "{}") {
                    return resolve(false);
                }
                
                const game = result[0];
                const gameName = game["name"];
                const gameplayMain = game["gameplayMain"];
                const gameplayComplete = game["gameplayCompletionist"];
                const url = `https://howlongtobeat.com/${game["id"]}`;

                return resolve({
                    game: gameName,
                    gameplayMain,
                    gameplayComplete,
                    url
                });
            })
            .catch(err => {
                console.log(err);
                return resolve(false);
            });
    });
};

module.exports = getHowLongToBeatByTwitchGame;