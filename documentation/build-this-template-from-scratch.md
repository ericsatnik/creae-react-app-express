[View README.md](../README.md)

This template was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Express - Node.js web application framework](https://expressjs.com/)

# Build this template from scratch

## Step 1: 

Create a new `create-react-app` project, name it create-react-app-express, and install packages

```
 npx create-react-app create-react-app-express
```

## Step 2: 

Install `express` as a dependency

```
npm install express --save
```

## Step 3: 

Install `nodemon` and `concurrently` as dev dependencies

```
npm install nodemon concurrently --save-dev
```

## Step 4: Add `src/server/index.js` file

```
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
```

## Step 5: Update `src/App.js` file

```
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/users");
        const users = await response.json();
        setUsers(users);
      } catch (e) {
        console.log("5xx Server Error");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Users:</p>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

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



