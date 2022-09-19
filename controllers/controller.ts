import mysql from "mysql2";
import type { Request, Response } from "express";

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "users",
});

const roles = [`admin`, `user`];

export const createUser = (req: Request, res: Response) => {
  const firstName = req.query.firstName || null;
  const lastName = req.query.lastName || null;
  const email = req.query.email;
  const role = req.query.role as string;

  const query = `INSERT INTO users (firstName, lastName, email, role) VALUES (?, ?, ?, ?)`;
  const input = [firstName, lastName, email, role];

  if (!email) return res.send("you need to specify an email");
  if (!role) return res.send("you need to specify a role");

  if (!roles.includes(role)) {
    return res.send("only admin or user role allowed");
  }

  con.execute(query, input, err => {
    err
      ? (res.sendStatus(409), console.log(err))
      : (res.sendStatus(201), console.log("created user"));
  });
};

export const getAllUsers = (req: Request, res: Response) => {
  const queryAll = "SELECT * FROM users";
  const queryFromRoles = `SELECT * FROM users where role IN (?)`;
  const role = req.query.role;

  const query = role ? queryFromRoles : queryAll;
  const input = [role || null];

  con.execute(query, input, (err, results) => {
    err
      ? (res.sendStatus(500), console.log(err))
      : (res.send(results), console.log("fetching users"));
  });
};

export const getUser = (req: Request, res: Response) => {
  const id = req.params.id;

  const query = `SELECT * FROM users WHERE id=?`;
  const input = [id];

  con.execute(query, input, (err, results) => {
    console.log(query);
    err ? res.sendStatus(500) : (res.send(results), console.log("fetching user"));
  });
};

export const updateUser = (req: Request, res: Response) => {
  const firstName = req.query.firstName || null;
  const lastName = req.query.lastName || null;
  const role = req.query.role || null;
  const id = req.params.id;

  const query = `
  UPDATE users 
  SET 
  firstName=IFNULL(?, firstName),
  lastName=IFNULL(?, lastName),
  role=IFNULL(?, role)
  WHERE id=?`;
  const input = [firstName, lastName, role, id];

  if (!roles.includes(role as string) && role !== null) {
    return res.send("only admin or user role allowed");
  }

  firstName || lastName || role
    ? con.execute(query, input, err => {
        err
          ? (res.sendStatus(500), console.log(err))
          : (res.sendStatus(200), console.log("updated user"));
      })
    : res.sendStatus(400);
};

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;

  const query = `DELETE FROM users WHERE id=?`;
  const input = [id];

  con.execute(query, input, err => {
    err ? res.sendStatus(409) : (res.sendStatus(200), console.log("deleted user"));
  });
};
