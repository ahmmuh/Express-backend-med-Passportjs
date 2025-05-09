import User from "../models/User.js";
import bcrypt from "bcrypt";

//Registrera nya användare

export const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Användaren finns redan" });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    await newUser.save();
    console.log("NY användare har registrerats", newUser);
    return res.status(201).json({ message: "Ny användare har registrerats" });
  } catch (error) {
    return res.status(500).json({ message: "Server fel", error: error });
  }
};

//User lista
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return req.status(400).json({ message: "Det finns inga users" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server fel" });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Det finns inga user med detta ID" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Denna user finns ej" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server fel" });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Det finns inga user med detta ID" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body);
    return res
      .status(200)
      .json({ message: "User har uppdaterats", updatedUser: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Server fel" });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Det finns inga user med detta ID" });
  }
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ message: "User har tagits bort", user: deletedUser });
  } catch (error) {
    return res.status(500).json({ message: "Server fel" });
  }
};
