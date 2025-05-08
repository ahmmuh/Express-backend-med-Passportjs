import User from "../models/User.js";
import { Strategy as LocalStrategy } from "passport-local";

export const configurePassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userName",
        passwordField: "password",
      },
      findUserInfo()
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

//Find user info
const findUserInfo = () => {
  return async (userName, password, done) => {
    try {
      const user = await User.findOne({ userName });
      if (!user) return done(null, false, { message: "Incorrect userName" });

      const isMatch = await user.isValidPassword(password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };
};
