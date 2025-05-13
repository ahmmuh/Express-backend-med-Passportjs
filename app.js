import dotenv from "dotenv";
import passport from "passport";
import mongoose from "mongoose";
import User from "./models/User.js";
import cors from "cors";
dotenv.config();
import session from "express-session";
import express from "express";
import { configurePassport } from "./config-passport/passportConfig.js";
import authRoute from "./routes/authRoute.js";
import bookRoute from "./routes/bookRoute.js";
import { getConnection } from "./database/db.js";
import userRoute from "./routes/userRoute.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Passport setup

// console.log("Mongo URI:", process.env.CONNECTION_STRING); // ska inte vara undefined

// await mongoose.connect(process.env.CONNECTION_STRING);

//Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: "lax" }, // byt till true om du ska använda HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

//Auth Route

app.use("/api/auth", authRoute);
app.use("/api", bookRoute);
app.use("/api", userRoute);
// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  getConnection();
  console.log(`App listening on port ${PORT}!`);
});
