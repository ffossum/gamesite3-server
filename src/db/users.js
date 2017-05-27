const shortid = require('shortid');
const users = new Map();

async function addUser({ username, email, password }) {
  const id = shortid.generate();
  const user = {
    id,
    username,
    email,
    password,
  };

  users.set(id, user);
}

async function getUserById(id) {
  return users.get(id);
}

module.exports = {
  addUser,
  getUserById,
};
