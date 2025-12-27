import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { name, email, dob, password } = req.body

    if (!name || !name.trim())
      return res.status(400).json({ message: "Name is required" })

    if (!email || !email.trim())
      return res.status(400).json({ message: "Email is required" })

    if (!password || password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" })

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      dob,
      password: hashedPassword
    })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dob: user.dob
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Registration failed" })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dob: user.dob
      }
    })

  } catch (error) {
    console.error("Login Error:", error)
    res.status(500).json({ message: "Login failed" })
  }
}

