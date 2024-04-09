const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages"); // importer la fonction
const { userJoin, getCurrentUser, userLeave } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Définir le répertoire static public côté client
app.use(express.static(path.join(__dirname, "public")));

// Définir le nom du bot
const botName = "RealtimeChat BOT";

// Afficher la connexion d'un utilisateur
io.on("connection", (socket) => {
  // Afficher le message de connexion d'un utilisateur avec son nom
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room); // ajouter l'utilisateur au array

    socket.join(user.room); // rejoindre la room

    // Afficher le message de bienvenue
    socket.emit(
      "message",
      formatMessage(botName, "Bienvenue sur Realtime Chat!")
    ); // Afficher le message formaté

    // Afficher quand un utilisateur se connecte
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} a rejoint le chat`)
      );
    // broadcast envoie le message à tout le monde sauf à l'utilisateur qui se connecte

    // Afficher quand un utilisateur se déconnecte
    socket.on("disconnect", () => {
      io.emit(
        "message",
        formatMessage(botName, `${user.username} a quitté le chat`)
      );
    });
  });

  // Ecouter le chatMessage coté serveur
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id); // récupérer l'utilisateur actuel

    // ici le paramètre msg est récupéré côté client à l'émition de l'événement "chatMessage"
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Serveur actif sur le port ${PORT}...`));
