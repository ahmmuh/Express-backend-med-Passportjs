import { loginUser, logoutUser } from "../controllers/AuthController.js";

import express from "express";

const authRoute = express.Router();
authRoute.post("/login", loginUser);
authRoute.post("/logout", logoutUser);

export default authRoute;
