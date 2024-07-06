// import a user-creation model
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/user.js";
dotenv.config();

export const registerAdmin = async(req,res)=>{
  const { username, email, password} = req.body;
  try{

  }
  catch(err)
  {res.status(500).json({message:err.message});}
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
    // validate the password (can create a component for this one)
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

