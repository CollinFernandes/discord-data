const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require('dotenv').config();
const port = 3000;
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
  axios
    .get(`https://discord.com/api/v9/users/${id}`, {
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving Discord data");
    });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});