const {listen} = require('./api');
listen(3020, () => {
    console.log(`API Elo en écoute sur le port ${3020}`);
});
