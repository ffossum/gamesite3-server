const shortid = require('shortid');

const usersById = new Map();
const usersByEmail = new Map();
const usersByName = new Map();

async function addUser({ username, email, password }) {
  const id = shortid.generate();
  const user = {
    id,
    username,
    email,
    password,
  };

  usersById.set(id, user);
  usersByEmail.set(email, user);
  usersByName.set(username, user);

  return { id };
}

async function getUserById(id) {
  return usersById.get(id);
}

async function getUserByEmail(email) {
  return usersByEmail.get(email);
}

module.exports = {
  addUser,
  getUserById,
  getUserByEmail,
};
