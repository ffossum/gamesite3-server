import * as shortid from "shortid";
import { UserId } from "./users";

type GameId = string;

export interface IGame {
  host: UserId;
  id: GameId;
  players: UserId[];
}

const gamesById = new Map<GameId, IGame>();

export async function createGame(host: UserId): Promise<IGame> {
  const gameId = shortid.generate();

  return {
    host,
    id: gameId,
    players: [],
  };
}
