import * as deepstream from "deepstream.io-client-js";
import { createGame } from "./db/games";

export default function(client: deepstreamIO.Client) {
  client.rpc.provide("create-game", async (data, response) => {
    try {
      const userId = data.uid;
      const game = await createGame(userId);
      response.send(game);
    } catch (err) {
      response.error("error");
    }
  });
}
