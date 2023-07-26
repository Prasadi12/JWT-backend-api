const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO registration (`email`,`password`) VALUES(?)";
  const value = [req.body.email, req.body.password];
  db.query(sql, [value], (err, data) => {
    if (err) {
      res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM registration WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      res.json("Error");
    } else if (data.length > 0) {
      const id = data[0].id;
      const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: 300});
      return res.json({Login: true, token, data});
    } else {
      return res.json("Fail");
    }
  });
});

app.listen(5000, () => {
  console.log("NodeApi is running on port 5000");
});
