import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

//Hash lösenord innan det sparas i databasen.
// userSchema.js
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Validera nya lösenord med det sparade lösenord i databasen
userSchema.methods.isValidPassword = async function (password) {
  console.log("Comparing password:", password);
  console.log("Stored hash:", this.password);
  const match = await bcrypt.compare(password, this.password);
  console.log("Match result:", match);
  return match;
};

const User = mongoose.model("User", userSchema);

export default User;
