import * as deepstreamIO from "deepstream.io-client-js";
import { addPlayer, createGame, getLobbyGames } from "./db/games";

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

    const joined = await addPlayer(gameId, userId);
    response.send(joined);

    if (joined) {

      client.event.emit("lobby", {
        p: {
          id: joined.id,
          players: joined.players,
        },
        t: "game-updated",
      });

      const channels = [
        ...joined.players.map(playerId => "user:" + playerId),
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
}
