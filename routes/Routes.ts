import type { Application } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/controller";

const Routes = (app: Application) => {
  app.route("/api/users").get(getAllUsers);
  app.route("/api/user").post(createUser);
  app.route("/api/user/:id").get(getUser).delete(deleteUser).patch(updateUser);
};

export default Routes;
