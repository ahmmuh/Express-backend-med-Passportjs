import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  registerUser,
  updateUser,
} from "../controllers/UserController.js";
import express from "express";

const userRoute = express.Router();

userRoute.delete("/users/:userId", isAuthenticated, deleteUser);
userRoute.get("/users/:userId", isAuthenticated, getUser);
userRoute.patch("/users/:userId", isAuthenticated, updateUser);
userRoute.get("/users", isAuthenticated, getUsers);
userRoute.post("/users", registerUser);


export default userRoute;
