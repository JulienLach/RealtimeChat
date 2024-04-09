// acceder au formulaire pour récupérer les messages
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Attraper le nom d'utilisateur et la room depuis l'URL avec la librairie Qs (ajoutée en CDN au HTML)
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
// console.log(username, room);

const socket = io(); // initialiser le socket de la library socket.io

// Rejoindre la room
socket.emit("joinRoom", { username, room });

// Get la room et les utilisateurs
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room); // Afficher le nom de la room
  outputUsers(users); // Afficher les utilisateurs
});

// Message venant du serveur
socket.on("message", (message) => {
  // ici message est le message ""Bienvenue sur Realtime Chat!" quand l'événement "message" est émis par le serveur
  // les messages de connexion et de déconnexion sont aussi émis par le serveur et sont capturés ici
  console.log(message);
  outputMessage(message); // Afficher le message sur le DOM

  // Scroll down la liste des messagge dès qu'un message entre dans la liste
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Envoyer un message
chatForm.addEventListener("submit", (e) => {
  // (e) pour stopper le rechargement de la page
  e.preventDefault();

  // Récupérer le message texte
  const msg = e.target.elements.msg.value;

  // Envoyer le message au serveur
  socket.emit("chatMessage", msg);

  // Clear le formulaire à l'envoi du message au serveur
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Afficher le message sur le DOM en créant une div avec la classe message
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text} <!-- message est maintenant un objet donc on appele sa propriété text -->
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

// Afficher le nom de la room sur le DOM en changeant le titre de la room dans la div
function outputRoomName(room) {
  roomName.innerText = room;
}

// Afficher le array des users connectés à la room sur le DOM
function outputUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}`;
}
