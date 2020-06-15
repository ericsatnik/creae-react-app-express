[View README.md](../README.md)

This template was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) and [Express](https://github.com/expressjs/express)

# Build this template from scratch

## Step 1:

Create a new `create-react-app` project, name it create-react-app-express, and install packages

```
 npx create-react-app create-react-app-express
```

## Step 2:

Install `express` and `compression` as a dependency

```
npm install express compression --save
```

Learn more about this package:

- [express](https://github.com/expressjs/express)
- [compression](https://github.com/expressjs/compression)

## Step 3:

Install `nodemon` and `concurrently` as dev dependencies

```
npm install nodemon concurrently --save-dev
```

Learn more about these packages

- [nodemon](https://github.com/remy/nodemon)
- [concurrently](https://github.com/kimmobrunfeldt/concurrently)

## Step 4: Add `src/server/index.js` file

```
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
```

## Step 5: Update `src/App.js` file

```
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("api/users");
        const users = await response.json();
        setUsers(users);
        setUsersError(null);
        setIsLoading(false);
      } catch (e) {
        setUsers([]);
        setUsersError(e.message);
        console.log(usersError);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [users, usersError]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
        <br />
        {usersError && <div>{usersError}</div>}
        {users.length === 0 && (
          <div>
            <h1>Users:</h1>
            <p>No users could be found</p>
          </div>
        )}
        {users.length !== 0 && (
          <div>
            <h1>Users:</h1>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
        )}
        {isLoading && <p>Loading...</p>}
      </header>
    </div>
  );
}

export default App;
```

## Step 5: Update `src/App.css` file

```
.App-header {
  background-color: #282c34;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-main {
  background-color: white;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #282c34;
}
```

## Step 6: Add `proxy` to `package.json`

```
"proxy": "http://localhost:8080"
```

## Step 7: Update `scripts` in `package.json`

```
    "start": "concurrently \"npm run client\" \"npm run server\"",
    "client": "react-scripts start",
    "server": "nodemon src/server",
    "build": "concurrently \"react-scripts build\" \"npm run server\"",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
```

## Step 8: Start `create-react-app-express`

```
npm run start
```

Runs the app client and server in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
