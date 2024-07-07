import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.js"; // import a user-creation model
import {
  checkExistence,
  passwordStrength,
  createToken,
} from "../utils/userUtils.js";
dotenv.config();

export const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const conflict = await checkExistence(username, email);
    if (conflict) {
      return res.status(400).json(conflict);
    } // checking which one is better

    // validate the password (can create a component for this one)
    if (!passwordStrength(password)) {
      return res.status(400).son({ message: "Password is not strong enough" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // has the password -> in the user model:

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    }); // create the new admin
    await user.save();

    // send the user object and the JWT token in the response
    const token = createToken(user.id);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // verify if the username/email already exists
    await checkExistence(email, username); //this one is cleaner

    // check password
    if (!passwordStrength(password)) {
      return res.satus(400).json({ message: "password is not strong enough" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // has the password -> in the user model:

    const user = new User({ username, email, password: hashedPassword }); // create the new user
    await user.save();

    // create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    }); // modify creating a component with tokenCreations and then import it here.

    // send the user object and the JWT token in the response
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).select("-password"); // search the existence of the user by password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user }); // if coincidence found show the user information as a json object.
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = createToken(user.id);
    // create a cookie and storage the JWT refresh token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 }); // delete the token
  res.status(200).json({ message: "Logged out successfully" });
};
