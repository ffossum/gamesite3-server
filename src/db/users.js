const shortid = require('shortid');

const qwer = {
  id: 'qwer-id',
  username: 'qwer',
  email: 'qwer@qwer.com',
  password: 'qwerqwer',
};

const asdf = {
  id: 'asdf-id',
  username: 'asdf',
  email: 'asdf@asdf.com',
  password: 'asdfasdf',
};

const zxcv = {
  id: 'zxcv-id',
  username: 'zxcv',
  email: 'zxcv@zxcv.com',
  password: 'zxcvzxcv',
};

const usersById = new Map();
const usersByEmail = new Map();
const usersByName = new Map();

[qwer, asdf, zxcv].forEach(user => {
  usersById.set(user.id, user);
  usersByEmail.set(user.email, user);
  usersByName.set(user.username, user);
});

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

async function getUsersById(ids) {
  return ids.map(id => usersById.get(id));
}

async function getUserByEmail(email) {
  return usersByEmail.get(email);
}

function toPublicUserData(user) {
  return {
    id: user.id,
    username: user.username,
  };
}

module.exports = {
  addUser,
  getUserById,
  getUsersById,
  getUserByEmail,
  toPublicUserData,
};
