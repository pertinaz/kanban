import bcrypt from "bcrypt";

class User {
  constructor(username, email, password, role = "user") {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

let users = [];

export const addUser = async (username, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(username, email, password, role);
  users.push(newUser);
  return users;
};

export const findByEmail = (email) => {
  return users.find((users) => users.email === email); // Search existing email
};

export const findByname = (name) => {
  return users.find((users) => users.username === name); // Search existing username
};
