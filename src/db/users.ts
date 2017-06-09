import * as shortid from 'shortid';

type UserId = string;
type Email = string;
type Username = string;

export interface User {
  id: UserId;
  username: Username;
  email: Email;
  password: string;
}

export interface PublicUserData {
  id: UserId;
  username: Username;
}

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

const usersById = new Map<UserId, User>();
const usersByEmail = new Map<Email, User>();
const usersByName = new Map<Username, User>();

[qwer, asdf, zxcv].forEach(user => {
  usersById.set(user.id, user);
  usersByEmail.set(user.email, user);
  usersByName.set(user.username, user);
});

interface AddUserData {
  username: Username;
  email: Email;
  password: string;
}
export async function addUser({ username, email, password }: AddUserData) {
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

export async function getUserById(id: UserId) {
  return usersById.get(id);
}

export async function getUsersById(ids: UserId[]) {
  return ids.map(id => usersById.get(id));
}

export async function getUserByEmail(email: Email) {
  return usersByEmail.get(email);
}

export function toPublicUserData(user: User): PublicUserData {
  return {
    id: user.id,
    username: user.username,
  };
}
