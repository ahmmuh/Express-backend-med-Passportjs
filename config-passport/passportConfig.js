import User from "../models/User.js";
import { Strategy as LocalStrategy } from "passport-local";

export const configurePassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username", // matchar fältet du använder i databasen
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, { message: "Incorrect username" });
          }

          const isMatch = await user.isValidPassword(password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
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
