const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 1. This is our mini-store, acting as our in-memory database
const fruitCount = {};

// 2. Set up body-parser middleware so we can read incoming JSON
app.use(bodyParser.json());

// 3. This GET route returns the count of how many fruits there are
app.get("/fruitCount", (req, res) => {
  // read the specified fruit from the query string
  const { fruit } = req.query;

  // if fruit exists, we return the count, otherwise we return 404
  if (fruitCount[fruit] !== undefined) {
    return res.status(200).json({ count: fruitCount[fruit] });
  }
  return res.sendStatus(404);
});

// 4. This POST route increments the number of fruits stored in our database
app.post("/fruitCount", (req, res) => {
  // read the specified fruit form the body (already parsed by body-parser)
  const { fruit } = req.body;

  // if fruit exists, we add 1 to the number, otherwise we set its count to 1
  const fruitExists = fruitCount[fruit] !== undefined;
  fruitCount[fruit] = fruitExists ? fruitCount[fruit] + 1 : 1;

  return res.sendStatus(200);
});

module.exports = app;
