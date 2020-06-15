const express = require("express");
const compression = require("compression");
const app = express();

const users = [
  {
    id: 1,
    username: "user1",
  },
  {
    id: 2,
    username: "user2",
  },
  {
    id: 3,
    username: "user3",
  },
];

app.use(compression());

app.use(express.static("build"));

app.get("/ping", function (req, res) {
  console.log("pong");
  return res.send("pong");
});

app.get("/api/users", (req, res) => {
  console.log("get users");
  setTimeout(() => res.json(users), 300);
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
