import passport from "passport";
import User from "../models/User.js";

//Inloggning
export const loginUser = async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return next(error);
    if (!user) return res.status(401).json({ message: info.message });
    req.logIn(user, (error) => {
      if (error) return next(error);
      return res.status(201).json({ message: "Inloggningen lyckades" });
    });
  })(req, res, next);
};

//Utloggning

export const logoutUser = (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({ message: "Kunnde inte logga ut" });
    }
    return res.status(201).json({ message: "Utloggad" });
  });
};

// Visa inloggade användare

export const getCurrentUser = (req, res) => {
  return res.status(200).json({ user: req.user });
};
