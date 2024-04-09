const users = [];

// Ajouter un utilisateur au array
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get l'utilisateur actuel
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// L'utilisateur quitte le chat et quitte l'application, on retire donc du array l'utilisateur
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0]; // ici on retire l'utilisateur du array et on retourne l'utilisateur retiré avec [0]
  }
}

// Get tous les utilisateur d'une room
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
