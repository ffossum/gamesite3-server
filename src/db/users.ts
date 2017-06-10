import * as shortid from "shortid";

type UserId = string;
type Email = string;
type Username = string;

export interface IUser {
  id: UserId;
  username: Username;
  email: Email;
  password: string;
}

export interface IPublicUserData {
  id: UserId;
  username: Username;
}

const qwer = {
  email: "qwer@qwer.com",
  id: "qwer-id",
  password: "qwerqwer",
  username: "qwer",
};

const asdf = {
  email: "asdf@asdf.com",
  id: "asdf-id",
  password: "asdfasdf",
  username: "asdf",
};

const zxcv = {
  email: "zxcv@zxcv.com",
  id: "zxcv-id",
  password: "zxcvzxcv",
  username: "zxcv",
};

const usersById = new Map<UserId, IUser>();
const usersByEmail = new Map<Email, IUser>();
const usersByName = new Map<Username, IUser>();

[qwer, asdf, zxcv].forEach(user => {
  usersById.set(user.id, user);
  usersByEmail.set(user.email, user);
  usersByName.set(user.username, user);
});

interface IAddUserData {
  username: Username;
  email: Email;
  password: string;
}
export async function addUser({ username, email, password }: IAddUserData) {
  const id = shortid.generate();
  const user = {
    email,
    id,
    password,
    username,
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

export function toPublicUserData(user: IUser): IPublicUserData {
  return {
    id: user.id,
    username: user.username,
  };
}
