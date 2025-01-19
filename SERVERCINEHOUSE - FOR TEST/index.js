const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const dbops = require("./src/dbops.js");

const Port = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: "rnr56s6e2uk326pj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "et2ovx3swq3ia1ua",
  password: "cm3ozpo3uf2oek5i",
  database: "iv0pftopmt6gb2zm",
});

connection.connect();

const app = express();


app.use(bodyParser.json());
app.use(cors());

// Registra as rotas do dbops
app.use("/", dbops(connection));
app.use(express.json());

app.listen(Port, () => {
  console.log("Server is running: " + Port);
});

app.get("/", (req, res) => {
  res.send("Hello server 5000 is working");
});
