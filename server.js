const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Définir le répertoir static public
app.use(express.static(path.join(__dirname, "public")));

// Afficher la connexion d'un utilisateur
io.on("connection", (socket) => {
  socket.emit("message", "Bienvenue sur Realtime Chat!");

  // Afficher quand un utilisateur se connecte
  socket.broadcast.emit("message", "Un utilisateur a rejoint le chat");
  // broadcast envoie à tout le monde sauf à l'utilisateur qui se connecte

  // Afficher quand un utilisateur se déconnecte
  socket.on("disconnect", () => {
    io.emit("message", "Un utilisateur a quitté le chat");
  });

  // Ecouter le chatMessage coté serveur
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Serveur actif sur le port ${PORT}...`));
