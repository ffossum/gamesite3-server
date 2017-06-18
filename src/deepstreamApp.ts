import * as deepstreamIO from "deepstream.io-client-js";
import { addPlayer, createGame, getLobbyGames, removePlayer } from "./db/games";

export default function(client: deepstreamIO.Client) {
  client.rpc.provide("create-game", async (data, response) => {
    try {
      const userId = data.uid;
      const game = await createGame(userId);
      client.event.emit("lobby", { p: game, t: "create-game" });
      response.send(game);
    } catch (err) {
      response.error("error");
    }
  });

  client.rpc.provide("refresh-lobby", async (data, response) => {
    const games = await getLobbyGames();
    response.send(games);
  });

  client.rpc.provide("join-game", async (data, response) => {
    const gameId = data.gid;
    const userId = data.uid;

    const game = await addPlayer(gameId, userId);
    response.send(game);

    if (game) {
      client.event.emit("lobby", {
        p: {
          id: game.id,
          players: game.players,
        },
        t: "game-updated",
      });

      const channels = [
        ...game.players.map(playerId => "user:" + playerId),
        "spectate:" + gameId,
      ];

      channels.forEach(channelName => {
        client.event.emit(channelName, {
          p: {
            gid: gameId,
            uid: userId,
          },
          t: "player-joined",
        });
      });
    }
  });

  client.rpc.provide("leave-game", async (data, response) => {
    const gameId = data.gid;
    const userId = data.uid;

    const game = await removePlayer(gameId, userId);
    response.send(game);

    if (game) {
      client.event.emit("lobby", {
        p: {
          id: game.id,
          players: game.players,
        },
        t: "game-updated",
      });

      const channels = [
        ...game.players.map(playerId => "user:" + playerId),
        "spectate:" + gameId,
      ];

      channels.forEach(channelName => {
        client.event.emit(channelName, {
          p: {
            gid: gameId,
            uid: userId,
          },
          t: "player-left",
        });
      });
    }
  });
}
