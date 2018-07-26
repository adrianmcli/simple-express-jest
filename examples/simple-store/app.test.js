const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  test("It should respond 404 to the GET method with an unknown fruit", async () => {
    const response = await request(app).get("/fruitCount?fruit=apple");

    expect(response.statusCode).toBe(404);
  });

  test("It should add a fruit via POST", async () => {
    const response = await request(app)
      .post("/fruitCount")
      .send({ fruit: "apple" });

    expect(response.statusCode).toBe(200);
  });

  test("It should retrieve the apple count via GET", async () => {
    const response = await request(app).get("/fruitCount?fruit=apple");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ count: 1 });
  });
});
