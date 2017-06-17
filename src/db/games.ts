import * as shortid from "shortid";
import { UserId } from "./users";

type GameId = string;

export interface IGame {
  createdTime: string;
  host: UserId;
  id: GameId;
  players: UserId[];
  status: string;
}

const gamesById = new Map<GameId, IGame>();

export async function createGame(host: UserId): Promise<IGame> {
  const gameId = shortid.generate();
  const createdTime = new Date().toISOString();

  const game = {
    createdTime,
    host,
    id: gameId,
    players: [host],
    status: "not_started",
  };

  gamesById.set(gameId, game);

  return game;
}

export async function getLobbyGames(): Promise<IGame[]> {
  const games = Array.from(gamesById.values());
  return games.filter(game => game.status === "not_started");
}
