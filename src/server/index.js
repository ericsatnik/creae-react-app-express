const express = require("express");

const app = express();

app.use(express.static("build"));

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get("/api/users", (req, res) => {
    res.json([
        {
            id: 1,
            username: "user1"
        },
        {
            id: 2,
            username: "user2"
        },
        {
            id: 3,
            username: "user3"
        }
    ]);
});

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`)
);