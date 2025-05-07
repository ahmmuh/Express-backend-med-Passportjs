import {
  deleteUser,
  getUser,
  getUsers,
  registerUser,
  updateUser,
} from "../controllers/UserController.js";
import express from "express";

const userRoute = express.Router();

userRoute.post("/users", registerUser);
userRoute.delete("/users/:userId", deleteUser);
userRoute.get("/users/:userId", getUser);
userRoute.patch("/users/:userId", updateUser);
userRoute.get("/users", getUsers);

export default userRoute;
