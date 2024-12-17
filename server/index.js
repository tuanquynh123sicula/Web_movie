const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB (bỏ các tùy chọn lỗi thời)
mongoose
  .connect("mongodb://localhost:27017/employee")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Route đăng ký
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  EmployeeModel.create({ name, email, password })
    .then((employee) => {
      res.json({
        message: "User created successfully",
        data: employee,
      });
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(400).json({
        message: "Failed to create user",
        details: err.message,
      });
    });
});

// Route đăng nhập
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  EmployeeModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Login successful", user });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.error("Error logging in:", err);
      res.status(500).json({
        message: "Internal server error",
        details: err.message,
      });
    });
});

// Start server
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
