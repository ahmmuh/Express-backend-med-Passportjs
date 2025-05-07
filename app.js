import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import session from "express-session";
import { configurePassport } from "./config-passport/passportConfig.js";
import authRoute from "./routes/authRoute.js";
import bookRoute from "./routes/bookRoute.js";
import { getConnection } from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

//Passport setup

console.log("Mongo URI:", process.env.CONNECTION_STRING); // ska inte vara undefined

await mongoose.connect(process.env.CONNECTION_STRING);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
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
