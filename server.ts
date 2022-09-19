import express from "express";
import Routes from "./routes/Routes";
import mysql from "mysql2";

const app = express(),
  port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Just api app");
});

app.listen(port);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

con.connect(err => {
  if (err) return console.log("can't connect to mysql " + err);
  console.log("Connected successfully");
  const createDatabase = `CREATE DATABASE IF NOT EXISTS users`;
  con.query(createDatabase, err => {
    if (err) console.log("can't create database " + err);
  });
  //email couldn't be TEXT, cuz it's unique
  const createTable = `
  CREATE TABLE IF NOT EXISTS 
  users.users(id INT AUTO_INCREMENT PRIMARY KEY,
     firstName TEXT, lastName TEXT, 
     email varchar(20) NOT NULL UNIQUE,
      role TEXT NOT NULL)`;
  con.query(createTable, err => {
    if (err) console.log("can't create table " + err);
  });
});

Routes(app);
