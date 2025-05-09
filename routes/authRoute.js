import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../controllers/AuthController.js";

import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const authRoute = express.Router();
authRoute.post("/login", loginUser);
authRoute.post("/logout", isAuthenticated, logoutUser);
authRoute.get("/currentUser", isAuthenticated, getCurrentUser);

export default authRoute;
