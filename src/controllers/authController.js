// import a user-creation model
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  }); // create JWT token
};

// password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
const passwordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

export const registerAdmin = async (req, res) => {
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
    // verify if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    // verify if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    // password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordStrength = (password) => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*]/.test(password);

      return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar
      );
    };

    // validate the password (can create a component for this one)
    if (!passwordStrength(password)) {
      return res.status(400).son({ message: "Password is not strong enough" });
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
