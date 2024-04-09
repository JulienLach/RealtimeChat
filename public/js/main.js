// acceder au formulaire pour récupérer les messages
const chatForm = document.getElementById("chat-form");

const socket = io();

// Message venant du serveur
socket.on("message", (message) => {
  // ici message est le message ""Bienvenue sur Realtime Chat!" quand l'événement "message" est émis par le serveur
  // les messages de connexion et de déconnexion sont aussi émis par le serveur et sont capturés ici
  console.log(message);
  outputMessage(message); // Afficher le message sur le DOM
});

// Envoyer un message
chatForm.addEventListener("submit", (e) => {
  // (e) pour stopper le rechargement de la page
  e.preventDefault();

  // Récupérer le message texte
  const msg = e.target.elements.msg.value;

  // Envoyer le message au serveur
  socket.emit("chatMessage", msg);
});

// Afficher le message sur le DOM en créant une div avec la classe message
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    ${message}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
