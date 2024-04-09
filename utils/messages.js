// Pour le temps utiliser la librairie moment
const moment = require("moment");

// Créer une fonction qui va formater le message entrant en objet
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm:ss a"),
  };
}

module.exports = formatMessage;
