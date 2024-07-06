// import a user-creation model
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/user.js";
dotenv.config();

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // verify if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    // verify if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    // validate the password

    // password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character

    // has the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    }); // modify creating a component with tokenCreations and then import it here.

    // send the user object and the JWT token in the response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
