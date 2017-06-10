import * as request from "supertest";
import app from "./app";

describe("GET / (unauthenticated)", () => {
  test("responds with html", async () => {
    await request(app.callback())
      .get("/")
      .expect(200)
      .expect("Content-Type", /html/)
      .expect(res => {
        expect(res.text).toMatchSnapshot();
      });
  });
});
